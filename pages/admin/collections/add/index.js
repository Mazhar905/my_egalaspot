import React, { useState } from 'react'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import axios from "axios";
import { useRouter } from 'next/router'

function CollectionAdd() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeStatus, setActiveStatus] = useState(true);
    const router = useRouter();
  
    const [formData, setFormData] = useState({
      title: '',
      description: '',
    });
  
    const [condition, setCondition] = useState({
      name: 'tag',
      condition_filter: 'equal',
      value: '',
    });
  
    const [errors, setErrors] = useState({
      title: false,
      description: false,
      condition_value: false,
    });
  
    const [loadingSpinner, setLoadingSpinner] = useState(false);
  
    const toggleSidebarMenu = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const handleCheckboxChange = () => {
      setActiveStatus(!activeStatus);
    };
  
    const handleFormChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'title' || name === 'description') {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
  
        // Reset error state for the field being edited
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: false,
        }));
      } else if (name === 'conditionValue') {
        setCondition({ ...condition, value });
  
        // Reset error state for condition value
        setErrors((prevErrors) => ({
          ...prevErrors,
          condition_value: false,
        }));
      }
    };
  
    const validateForm = () => {
      let isValid = true;
      const newErrors = { ...errors };
  
      if (formData.title.trim().length === 0) {
        newErrors.title = true;
        isValid = false;
      } else {
        newErrors.title = false;
      }
  

      if (condition.value.trim().length === 0) {
        newErrors.condition_value = true;
        isValid = false;
      } else {
        newErrors.condition_value = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };
  
    const handleSave = async (e) => {
      e.preventDefault();

  
      if (validateForm()) {
        setLoadingSpinner(true);
  
        const data = {
          title: formData.title,
          description: formData.description,
          condition,
          activeStatus
        };
  
        try {
          const response = await axios.post('/api/admin/collection/add/addCollection', data);
          if (response.status === 200) {
            // Reset form and state upon successful save
            setFormData({
              title: '',
              description: '',
            });
            setCondition({ ...condition, value: '' });
            setLoadingSpinner(false);
            router.push('/admin/collections');
          }
        } catch (error) {
          console.error('Error saving product:', error);
        }
  
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
                                        Add Collection
                                    </h6>
                                    <button type="submit" onClick={(e) => { handleSave(e) }} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled={loadingSpinner}>
                                        {loadingSpinner ? ( // Conditional rendering of spinner or text based on loading state
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
                                    Collection Information
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
                                    <div className=" flex flex-row items-center flex-wrap w-full px-4 my-3 mb-2">
                                        <label className="block uppercase text-black text-xs font-bold mb-2">
                                            Condition
                                        </label>
                                    </div>
                                    <div className=" flex flex-row items-center flex-wrap w-full px-2">
                                        <div className="w-1/3 px-2">
                                            <select
                                                onChange={(e) => {
                                                    setCondition({ ...condition, name: e.target.value });
                                                }}
                                                className='outline-none h-10 flex items-center mb-0 text-sm bg-transparent  border-gray-300 border-2  pt-0 p-1 w-full rounded'
                                            >
                                                <option value={condition.name} className='capitalize'>Product {condition.name}</option>
                                            </select>

                                        </div>
                                        <div className="w-1/3 px-2">
                                            <select className='outline-none h-10 flex items-center mb-0 text-sm bg-transparent  border-gray-300 border-2  pt-0 p-1 w-full rounded'>
                                                <option value={condition.condition_filter}>Is Equal To</option>
                                            </select>
                                        </div>
                                        <div className="relative px-2 w-1/3">
                                            <div className={`${errors.condition_value ? 'border-red-500 border-2' : 'border-gray-300 border-2 '} border h-10 border-black px-2 rounded`}>
                                                <input
                                                    type="text"
                                                    name='conditionValue'
                                                    value={condition.value}
                                                    onChange={(e) => handleFormChange(e)}
                                                    className={`flex items-center outline-none text-sm bg-transparent w-full h-full`}
                                                    placeholder="Add a tag"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="w-full px-4 mt-10">
                                        <p className="flex items-center mr-4 text-sm font-medium mb-3 text-gray-900 dark:text-gray-300">Status <p className='capitalize ms-2'>({activeStatus ? 'active' : 'draft'})</p></p>
                                        <div className="flex flex-row items-center space-x-5">
                                            <label className="relative cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={activeStatus} // Bind checked attribute to activeStatus
                                                    onChange={handleCheckboxChange} // Handle checkbox change
                                                    className="sr-only peer" // Hide default checkbox and use peer for styling
                                                />
                                                <div
                                                    className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500">
                                                </div>
                                            </label>


                                        </div>
                                    </div>
                                    <div className="w-full my-4 px-4">
                                        <button type="submit" onClick={(e) => { handleSave(e) }} className="w-full bg-red-500 text-white active:bg-red-600 mt-5 font-bold uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" disabled={loadingSpinner}>
                                            {loadingSpinner ? ( // Conditional rendering of spinner or text based on loading state
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
                        </div>
                    </div>
                </form>
                <Footer />
            </div>
        </div>
    </>
)
}

export default CollectionAdd;