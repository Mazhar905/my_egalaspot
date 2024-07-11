import React, { useState } from 'react'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import Select from 'react-select';
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from '../../components/spinner'
import Image from 'next/image'

function ProductAdd() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({ colors: [], sizes: [] });
    const [isUploading, setIsUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState("");
    const uploadImagesQueue = [];
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        stock: false,
        price: false,
        images: false,
    });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: [],
        attributes: {
            colors: [],
            sizes: [],
        },
        stock: "",
        price: "",
    });


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (errors.title && errors.description && errors.price, errors.images && errors.stock && errors.price) {
            validateForm();
        }
    };

    const [loadingCartButton, setLoadingCartButton] = useState(false); // State to manage loading spinner

    const handleAttributeChange = (selectedOption) => {
        if (!selectedAttributes.includes(selectedOption.value)) {
            setSelectedAttributes([...selectedAttributes, selectedOption.value]);
        }
        setFormData({ ...formData, attributes: attributeValues });
    };



    const toggleSidebarMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Map collections to options format required by react-select
    const attributeOptions = ["color", "size"].map(option => ({
        value: option,
        label: option,
    }));



    const addColor = (color) => {
        if (!attributeValues.colors.includes(color)) {
            setAttributeValues(prevState => ({
                ...prevState,
                colors: [...prevState.colors, color]
            }));
        }
    };

    const addSize = (size) => {
        if (!attributeValues.sizes.includes(size)) {
            setAttributeValues(prevState => ({
                ...prevState,
                sizes: [...prevState.sizes, size]
            }));
        }
    };

    const removeColor = (index) => {
        setAttributeValues(prevState => ({
            ...prevState,
            colors: prevState.colors.filter((_, i) => i !== index)
        }));
    };

    const removeSize = (index) => {
        setAttributeValues(prevState => ({
            ...prevState,
            sizes: prevState.sizes.filter((_, i) => i !== index)
        }));
    };









    // tags
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            addTag();
        }
    };

    const handleBlur = () => {
        if (inputValue.trim()) {
            addTag();
        }
    };

    const addTag = () => {
        setTags([...tags, inputValue.trim().toLowerCase()]);
        setFormData({ ...formData, tags: [...tags, inputValue.trim().toLowerCase()] });
        setInputValue('');
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };


    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('image deleted successfully!!')
    }



    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (formData.title.trim().length == 0) {
            newErrors.title = true;
            isValid = false;
        } else {
            newErrors.title = false;
        }

        if (formData.description.trim().length <= 30) {
            newErrors.description = true;
            isValid = false;
        } else {
            newErrors.description = false;
        }

        if (formData.stock <= 0) {
            newErrors.stock = true;
            isValid = false;
        } else {
            newErrors.stock = false;
        }

        if (formData.price <= 0) {
            newErrors.price = true;
            isValid = false;
        } else {
            newErrors.price = false;
        }
        if (images.length < 1) {
            newErrors.images = true;
            setImageError("Please select image");
            isValid = false;
        } else {
            newErrors.images = false;
            setImageError("");
        }

        setErrors(newErrors);
        return isValid;
    };



    const uploadImages = async (ev) => {
        const files = ev.target?.files;


        const maxFiles = 6; // Maximum number of files allowed
        const maxSize = 2 * 1024 * 1024; // Maximum file size in bytes (5 MB)
        const validExtensions = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/gif'];


        if (files.length > maxFiles) {
            setImageError(`You can upload a maximum of ${maxFiles} images.`);
            setErrors(prevErrors => ({ ...prevErrors, images: true }));
            return false;
        }

        for (const file of files) {
            if (!validExtensions.includes(file.type.toLowerCase())) {
                setImageError('Only PNG, JPG, SVG, WEBP, and GIF files are allowed.');
                setErrors(prevErrors => ({ ...prevErrors, images: true }));
                return false;
            }

            if (file.size > maxSize) {
                setImageError('Each file must be less than 2 MB.');
                setErrors(prevErrors => ({ ...prevErrors, images: true }));
                return false;
            }
        }

        setImageError('');
        setErrors(prevErrors => ({ ...prevErrors, images: false }));
        setIsUploading(true);



        // Validate the files obtained from ev.target.files
        if (errors.images) {
            setIsUploading(false);
            toast.error('Invalid files selected. Please check the file types and sizes.');
            return;
        }

        const uploadPromises = Array.from(files).map(file => {
            const data = new FormData();
            data.append('file', file);

            return axios.post('/api/admin/product/add/addProductImage', data)
                .then(res => {
                    setImages(oldImages => [...oldImages, ...res.data.links]);
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    toast.error('Failed to upload images. Please try again.');
                    throw error;
                });
        });

        try {
            await Promise.all(uploadPromises);
            setIsUploading(false);
            toast.success('Images uploaded successfully.');
        } catch (error) {
            setIsUploading(false);
            console.error('Failed to upload images:', error);
            toast.error('Failed to upload images. Please try again.');
        }
    };



    const handleSave = async (e) => {
        e.preventDefault();




        if (validateForm()) {


            setLoadingCartButton(true);

            const data = {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                stock: formData.stock,
                tags: formData.tags,
                attributes: attributeValues,
                images: images
            };



            try {
                const response = await axios.post('/api/admin/product/add/addProduct', data);
                if (response.data.product) {
                    // Reset form and state upon successful save
                    setFormData({
                        title: '',
                        description: '',
                        tags: [],
                        attributes: { colors: [], sizes: [] },
                        stock: "",
                        price: ""
                    });
                    setSelectedAttributes([]);
                    setAttributeValues({ colors: [], sizes: [] });
                    setImages([]);
                    setTags([]);
                    toast.success('Product created!');
                }
            } catch (error) {
                console.error('Error saving product:', error);
                toast.error('Failed to save product. Please try again.');
            }

            setLoadingCartButton(false);
        }
    };



    return (
        <>
            <div className="flex h-screen overflow-y-hidden bg-white">
                <Loading />
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebarMenu={toggleSidebarMenu} />
                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    <Header isSidebarOpen={isSidebarOpen} toggleSidebarMenu={toggleSidebarMenu} />
                    <form className="flex-1 relative flex flex-col md:flex-row flex-nowrap lg:flex-wrap justify-center items-stretch lg:items-start max-h-full p-5 overflow-hidden overflow-y-scroll mt-6">
                        <div className="w-full md:w-4/6 max-w-4xl px-2">

                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                                <div className="rounded-t border-b-4 bg-white mb-0 px-6 py-6">
                                    <div className="text-center flex justify-between">
                                        <h6 className="text-blueGray-700 text-xl font-bold">
                                            Add Product
                                        </h6>
                                        <button type="submit" onClick={(e) => { handleSave(e) }} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled={loadingCartButton}>
                                            {loadingCartButton ? ( // Conditional rendering of spinner or text based on loading state
                                                <div role="status" className='mx-auto'>
                                                    <svg aria-hidden="true" className="mx-auto w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only text-black">Loading...</span>
                                                </div>
                                            ) : (
                                                "SAVE"
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3 flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Product Information
                                    </h6>
                                    <div className="bg-gray-50 rounded-lg px-3 py-5 flex flex-wrap">
                                        <div className="w-full px-4">
                                            <div className={`relative w-full mb-3`}>
                                                <label className="block uppercase text-black text-xs font-bold mb-2">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    placeholder='Title'
                                                    value={formData.title}
                                                    onChange={handleFormChange}
                                                    className={`${errors.title ? 'border-red-500 border-2' : 'border-gray-300 border-2'} px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                                />
                                                <p className='min-h-3 text-xs my-1 text-red-500 capitalize'>
                                                    {(formData.title.length == 0 && errors.title)
                                                        && "Invalid Title : "}
                                                    {errors.title && formData.title.length == 0 && "Title can't be blank"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-black text-xs font-bold mb-2">
                                                    Description
                                                </label>
                                                <textarea type="text"
                                                    name="description"
                                                    placeholder='Description'
                                                    value={formData.description}
                                                    onChange={handleFormChange}
                                                    className={`${errors.description ? 'border-red-500 border-2' : 'border-gray-300 border-2 '} border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`} rows="4"></textarea>
                                                <p className='text-xs min-h-3 my-1 text-red-500 capitalize'>
                                                    {errors.description && formData.description.length <= 30 && "Invalid description : "}{errors.description && formData.description.length <= 30 && "Write description upto 30 charactors"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4 w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-black text-xs font-bold mb-2">
                                                    Price
                                                </label>
                                                <input type="number"
                                                    name="price"
                                                    placeholder='Price'
                                                    value={formData.price}
                                                    onChange={handleFormChange}
                                                    min={1}
                                                    className={`${errors.price ? 'border-red-500 border-2' : 'border-gray-300 border-2'} border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} />
                                                <p className='text-xs my-1 min-h-3 text-red-500 capitalize'>{errors.price && "Invalid Price"}</p>
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-black text-xs font-bold mb-2">
                                                    Stock
                                                </label>
                                                <input type="number"
                                                    name="stock"
                                                    placeholder='Stock'
                                                    value={formData.stock}
                                                    onChange={handleFormChange}
                                                    className={`${errors.stock ? 'border-red-500 border-2' : 'border-gray-300 border-2  '} px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} />
                                                <p className='text-xs min-h-3 my-1 text-red-500 capitalize'>{errors.stock && "Invalid stock"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Attributes
                                    </h6>
                                    <div className="bg-gray-50 rounded-lg px-4 py-5 flex flex-wrap">
                                        <div className="w-full">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-black text-xs font-bold mb-2">
                                                    Add Attribute
                                                </label>
                                                <Select
                                                    options={attributeOptions}
                                                    onChange={handleAttributeChange}
                                                    placeholder="Select Attribute"
                                                    isSearchable={true}
                                                    className="border-0 capitalize placeholder-black-300 text-black rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                                />
                                            </div>
                                        </div>
                                        {selectedAttributes.includes('color') && (
                                            <div className="bg-red-500 rounded-lg py-4 flex flex-wrap px-4 w-full items-center">
                                                {attributeValues.colors.map((color, index) => (
                                                    <div key={index} className="relative w-full mb-3">
                                                        <label className="block uppercase text-white text-xs font-bold mb-2">
                                                            Color {index + 1}
                                                        </label>
                                                        <div className="mt-2 border-2 border-gray flex items-center pe-3 space-x-3">
                                                            <input
                                                                type="text"
                                                                placeholder='Add New Color'
                                                                className="px-3 py-3 outline-none placeholder-white text-white rounded text-sm w-full ease-linear bg-transparent transition-all duration-150"
                                                                value={color}
                                                                onChange={(e) => {
                                                                    const newColors = [...attributeValues.colors];
                                                                    newColors[index] = e.target.value;
                                                                    setAttributeValues(prevState => ({
                                                                        ...prevState,
                                                                        colors: newColors
                                                                    }));
                                                                }}
                                                            />
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white cursor-pointer" onClick={() => removeColor(index)}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addColor('')}
                                                    className="text-sm block w-full text-start text-white"
                                                >
                                                    + Add Color
                                                </button>
                                            </div>
                                        )}

                                        {selectedAttributes.includes('size') && (
                                            <div className="bg-red-500 mt-2 rounded-lg py-4 flex flex-wrap px-4 w-full items-center">
                                                {attributeValues.sizes.map((size, index) => (
                                                    <div key={index} className="relative w-full mb-3">
                                                        <label className="block uppercase text-white text-xs font-bold mb-2">
                                                            Size {index + 1}
                                                        </label>
                                                        <div className="border-2 border-white flex items-center pe-3 space-x-3">
                                                            <input
                                                                type="text"
                                                                placeholder='Enter Size'
                                                                className="border-0 px-3 py-3 placeholder-white text-white bg-transparent rounded text-sm shadow outline-none w-full ease-linear transition-all duration-150"
                                                                value={size}
                                                                onChange={(e) => {
                                                                    const newSizes = [...attributeValues.sizes];
                                                                    newSizes[index] = e.target.value;
                                                                    setAttributeValues(prevState => ({
                                                                        ...prevState,
                                                                        sizes: newSizes
                                                                    }));
                                                                }}
                                                            />
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white cursor-pointer" onClick={() => removeSize(index)}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addSize('')}
                                                    className="text-sm block w-full text-start text-white "
                                                >
                                                    + Add Size
                                                </button>
                                            </div>
                                        )}

                                    </div>

                                    <hr className="mt-6 border-b-1 border-blueGray-300" />



                                    {/* Images upload */}
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Images
                                    </h6>
                                    <div className={`bg-gray-50 rounded-lg p-3 flex flex-wrap flex-row ${errors.images && imageError.trim().length > 0 ? "border-2 border-red-500" : "border-2"}`}>
                                        {/* Spinner during upload */}
                                        {isUploading && (
                                            <div className="w-1/4 grid grid-cols-2 items-center rounded">
                                                <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                            </div>
                                        )}

                                        {/* Display uploaded images */}
                                        {!isUploading && (
                                            <div className="flex space-x-2 flex-row items-center flex-wrap">
                                                {images?.map((link, index) => (
                                                    <div key={link} className="w-full justify-center sm:justify-start max-w-32 mx-auto sm:mx-0 relative border flex items-center group">
                                                        <Image src={link} alt="image" width={128} height={128} className="object-contain w-32 rounded-md p-2 cursor-pointer transition-transform transform-gpu group-hover:scale-105" />
                                                        <div className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                                                            <button onClick={() => handleDeleteImage(index)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white p-1 bg-black rounded-full">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                ))}

                                                <label
                                                    className="bg-white text-gray-500 font-semibold rounded max-w-md p-2 text-center text-sm md:text-lg flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                                        <path
                                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                            data-original="#000000" />
                                                        <path
                                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                            data-original="#000000" />
                                                    </svg>
                                                    Upload file
                                                    <input id="fileInput" type="file" className="hidden" accept="image/*" multiple onChange={uploadImages} />
                                                </label>


                                            </div>
                                        )}





                                    </div>
                                    <p className='min-h-3 text-xs my-1 text-red-500 capitalize'>
                                        {(errors.images)
                                            && "Invalid Image : "}
                                        {imageError}
                                    </p>


                                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    <button type="submit" onClick={(e) => { handleSave(e) }} className="w-full bg-red-500 text-white active:bg-red-600 font-bold uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled={loadingCartButton}>
                                        {loadingCartButton ? ( // Conditional rendering of spinner or text based on loading state
                                            <div role="status" className='mx-auto'>
                                                <svg aria-hidden="true" className="mx-auto w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only text-black">Loading...</span>
                                            </div>
                                        ) : (
                                            "SAVE"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <aside className='w-full md:w-1/3 max-w-lg px-2 relative md:sticky top-0'>
                            <div className="rounded-t shadow-xl bg-white mb-0 px-0 lg:px-6 py-6">
                                <div className="w-full px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-black text-xs font-bold mb-2">
                                            Tags
                                        </label>
                                        <div className="border  border-black pt-0 p-2 rounded">
                                            {tags.map((tag, index) => (
                                                <div key={index} className="mr-2 inline-flex items-center bg-red-500 text-white rounded mt-2 p-2">
                                                    <p>{tag}</p>
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-white"
                                                        onClick={() => removeTag(index)}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                onBlur={handleBlur}
                                                className="mt-2 outline-none max-w-16 text-sm bg-transparent"
                                                placeholder="Add a tag"
                                            />
                                        </div>
                                        <p className='text-xs mt-3'>Pick up appropriate Tags to add product in collection</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </form>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default ProductAdd;