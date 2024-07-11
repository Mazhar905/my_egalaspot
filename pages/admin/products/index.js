"use client";
import Loading from '../components/loading';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Papa from 'papaparse';
import { useRouter } from 'next/router';
const baseUrl = process.env.baseUrl;


export default function Products({ products }) {


  const [data, setData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [productsUploading, setProductsUploading] = useState(false);
  const [productPagination, setProductPagination] = useState({
    page: 1,
    offset: 0,
    limit: 100
  });
  const [showWarnModal, setShowWarnModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const currentPage = productPagination.page; // Assuming you have the current page index
  const totalPages = Math.ceil(products.length / productPagination.limit);

  const handleClickPage = (page) => {
    const newOffset = (page - 1) * productPagination.limit;
    setProductPagination({
      ...productPagination,
      page: page,
      offset: newOffset
    });
  };


  const toggleSidebarMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
    startProgress();
  };

  const pushProducts = () => {
    const transformedData = data.map(d => {
      // Split tags, colors, and sizes if they are in string format
      let tagsArray = (d.tags && typeof d.tags === 'string') ? d.tags.split("|").map(tag => tag.trim().toLowerCase()) : [];
      let colorsArray = (d['attributes.colors'] && typeof d['attributes.colors'] === 'string') ? d['attributes.colors'].split("|").map(color => color.trim().toLowerCase())  : [];
      let sizesArray = (d['attributes.sizes'] && typeof d['attributes.sizes'] === 'string') ? d['attributes.sizes'].split("|") : [];

      // Split images and trim whitespace
      let imagesArray = (d.images && typeof d.images === 'string') ? d.images.split(",").map(image => image.trim()) : [];

      return {
        title: d.title || '',
        description: d.description || '',
        attributes: {
          colors: colorsArray,
          sizes: sizesArray
        },
        tags: tagsArray,
        stock: parseInt(d.stock) || 0, // Convert stock to integer, default to 0 if not valid
        price: parseFloat(d.price) || 0.0, // Convert price to float, default to 0.0 if not valid
        images: imagesArray.length > 0 ? imagesArray : ["https://asset.cloudinary.com/duhttpdqd/ca58df017b40df4c4fa461184aa5a3ea"], // Default image if none provided
        status: "active"
      };
    });

    // Create an object to store products by title for quick lookup
    const productsMap = {};
    transformedData.forEach(product => {
      if (productsMap[product.title]) {
        // Update existing product if title already exists
        const existingProduct = productsMap[product.title];
        existingProduct.tags = [...new Set([...existingProduct.tags, ...product.tags])]; // Merge tags, ensuring uniqueness
        existingProduct.attributes.colors = [...new Set([...existingProduct.attributes.colors, ...product.attributes.colors])]; // Merge colors, ensuring uniqueness
        existingProduct.attributes.sizes = [...new Set([...existingProduct.attributes.sizes, ...product.attributes.sizes])]; // Merge sizes, ensuring uniqueness
        existingProduct.stock += product.stock; // Add stock
        existingProduct.price = product.price; // Update price
        existingProduct.images = [...new Set([...existingProduct.images, ...product.images])]; // Merge images, ensuring uniqueness
      } else {
        // Add new product to the map
        productsMap[product.title] = product;
      }
    });

    // Convert productsMap object back to an array of products
    const updatedProducts = Object.values(productsMap);
    const chunkSize = 350;
    const totalProducts = updatedProducts.length;
    let currentIndex = 0;
    setProductsUploading(true);

    function sendProductsChunk() {
      const chunk = updatedProducts.slice(currentIndex, currentIndex + chunkSize);

      try {
        axios.post(`/api/admin/product/add/addBulkProduct`, chunk)
          .then(response => {
            if (response.status === 200) {
              console.log(`Chunk ${currentIndex / chunkSize + 1} sent successfully.`);
              currentIndex += chunkSize;

              // Check if there are more products to send
              if (currentIndex < totalProducts) {
                sendProductsChunk();
              } else {
                console.log('All Products sent successfully.');
                router.push("/admin/products");
              }
            }
          })
          .catch(error => {
            console.error(`Error sending products: `, error);
            // Optionally, handle errors and display error messages
          })
          .finally(() => {
            setProductsUploading(false);
            const progress = Math.min(100, (currentIndex / totalProducts) * 100);
            setProgress(progress);
          });
      } catch (error) {
        console.log(`API Error ${error}`);
      } finally {
        setShowModal(false);
      }
    }

    // Start sending the first chunk
    sendProductsChunk();

  };

  const startProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress > 100) {
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 200); // Adjust this interval to control the speed of animation (in milliseconds)
  };





  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  useEffect(() => {
    let filteredProducts;
    if (filter === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(product => product.status === filter);
    }

    setAllProducts(filteredProducts);
  }, [filter, products]);

  const toggleProductSelection = (productId) => {
    if (selectedProductsId.includes(productId)) {
      setSelectedProductsId(selectedProductsId.filter(id => id !== productId));
    } else {
      setSelectedProductsId([...selectedProductsId, productId]);
    }
  };

  const toggleAllProductsSelection = () => {
    if (selectedProductsId.length === allProducts.length) {
      setSelectedProductsId([]);
    } else {
      const productIds = allProducts.map(product => product._id);
      setSelectedProductsId(productIds);
    }
  };
  const BulkdeleteSelectedProducts = async () => {
    if (selectedProductsId.length > 0) {
      try {
        const apiUrl = `/api/admin/product/delete/deleteProducts`;
        const response = await axios.delete(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { ids: selectedProductsId }, // Pass data as the 'data' property in Axios for DELETE request
        });

        if (response.status === 200) {
          // Assuming your backend responds with status 200 even on success, you can check response.data for details
          const { message } = response.data;
          const updatedProducts = allProducts.filter(product => !selectedProductsId.includes(product._id));
          setAllProducts(updatedProducts);
          console.log(message); // Log success message
        } else {
          console.error('Delete operation failed:', response.data.error);
        }
        setPro
        setSelectedProductsId([]); // Clear selected products after deletion
      } catch (error) {
        console.error('Error deleting products:', error.message);
        // Handle error state
      }
    }
  };



  const deleteSelectedProducts = async () => {
    if (deleteId === "") {
      return;
    }
    console.log(deleteId);
    try {
      const response = await axios.delete(`/api/admin/product/delete/deleteProducts`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { ids: [deleteId] },
      });

      if (response.status === 200) {
        const { message } = response.data;
        const updatedCollections = allCollections.filter(col => col._id !== deleteId);
        setAllCollections(updatedCollections);
        setSelectedCollectionsId([]); // Clear selected collections after deletion
        setShowWarnModal(false);
        setDeleteId("");
        console.log(message); // Log success message
      } else {
        console.error('Delete operation failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting collections:', error.message);
    }
  };





  return (
    <>


      {showWarnModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="relative flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl w-5/6 text-left font-semibold capitalize">
                    Do you want to delete this product?
                  </h3>
                  <button
                    className="top-0 right-0 z-50 absolute p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowWarnModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowWarnModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteSelectedCollections()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


      <div className="flex h-screen overflow-y-hidden bg-white">
        <Loading />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebarMenu={toggleSidebarMenu} />

        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header isSidebarOpen={isSidebarOpen} toggleSidebarMenu={toggleSidebarMenu} />
          <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
            {/* Main content header */}
            <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
              <h1 className="text-2xl font-semibold whitespace-nowrap">Products</h1>
              <div className="flex-1 justify-end flex space-x-2">
                <button type='button'
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center px-4 py-2 space-x-1 border-red-500 text-red-500 border rounded-md shadow hover:bg-red-500 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className='size-3.5 text-sm me-1' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>Bulk Import
                </button>
                {showModal ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-redGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Import CSV file to import products
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            {!data.length > 0 ? (
                              <label for="productsImport"
                                className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                  <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                  <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                                </svg>
                                Upload CSV file

                                <input type="file" accept='.csv' onChange={handleFileUpload} id='productsImport' className="hidden" />
                                <p className="text-xs font-medium text-gray-400 mt-2">Only CSV file is allowed</p>
                              </label>
                            ) : (
                              <div className="flex flex-col bg-gray-50 p-4 rounded-lg mt-4">
                                <div className="flex items-center">
                                  <p className="text-xs text-gray-600 flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 mr-2 fill-current inline-block">
                                      <path d="m433.798 106.268-96.423-91.222C327.119 5.343 313.695 0 299.577 0H116C85.673 0 61 24.673 61 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55V146.222c0-15.049-6.27-29.612-17.202-39.954zM404.661 120H330c-2.757 0-5-2.243-5-5V44.636zM396 482H116c-13.785 0-25-11.215-25-25V55c0-13.785 11.215-25 25-25h179v85c0 19.299 15.701 35 35 35h91v307c0 13.785-11.215 25-25 25z" data-original="#000000" />
                                      <path d="M363 200H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15zm0 80H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15zm-147.28 80H143c-8.284 0-15 6.716-15 15s6.716 15 15 15h72.72c8.284 0 15-6.716 15-15s-6.716-15-15-15z" data-original="#000000" />
                                    </svg>
                                    File
                                  </p>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500" viewBox="0 0 320.591 320.591">
                                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                                  </svg>
                                </div>

                                <div className="bg-gray-300 rounded-full w-full h-2 my-2">
                                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center relative">
                                    <span className="absolute text-xs right-0 bg-white w-2 h-2 rounded-full"></span>
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}></div>
                                  </div>
                                </div>

                                <p className="text-xs text-gray-600 flex-1">{progress}% done</p>

                              </div>
                            )}
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-redGray-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => pushProducts()}
                            >
                              Import Products
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
                <Link
                  href="/admin/products/add"
                  className="inline-flex items-center justify-center px-4 py-2 space-x-1 bg-red-500 text-white rounded-md shadow hover:bg-transparent hover:text-red-500 hover:border-red-500 hover:border"
                >
                  <span>Add Product</span>
                </Link>
              </div>
            </div>

            <div className="border-t pt-2 overflow-x-auto">
              <div className="flex flex-nowrap items-center justify-start">
                <button
                  className={`inline-flex items-center mr-3 justify-center px-4 py-2 rounded-md shadow ${filter === 'all' ? 'bg-gray-200' : 'bg-white border-gray-300 border'
                    }`}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </button>
                <button
                  className={`inline-flex items-center mr-3 justify-center px-4 py-2 rounded-md shadow ${filter === 'active' ? 'bg-gray-200' : 'bg-white border-gray-300 border'
                    }`}
                  onClick={() => handleFilterChange('active')}
                >
                  Active
                </button>
                <button
                  className={`inline-flex items-center mr-3 justify-center px-4 py-2 rounded-md shadow ${filter === 'draft' ? 'bg-gray-200' : 'bg-white border-gray-300 border'
                    }`}
                  onClick={() => handleFilterChange('draft')}
                >
                  Draft
                </button>
                <div className={`p-3 text-right flex-grow flex items-center justify-end text-sm cursor-pointer font-semibold  ${selectedProductsId.length > 0 ? "text-gray-800" : "hidden"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { BulkdeleteSelectedProducts() }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="pl-4 w-8">
                      <input id="checkbox" onClick={() => { toggleAllProductsSelection() }} type="checkbox" className="hidden peer" />
                      <label
                        htmlFor="checkbox"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-red-500 border border-gray-400 rounded overflow-hidden"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check"
                            data-original="#000000"
                          />
                        </svg>
                      </label>
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-800">
                      Image
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-800">
                      Title
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-800">
                      Status
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-800">
                      Price
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-800">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                  {allProducts.slice(productPagination.offset, productPagination.offset + productPagination.limit)?.map((product, index) => {
                    return (
                      <>
                        <tr key={index + 1} className="odd:bg-gray-50">
                          <td className="pl-4 w-8">
                            <input
                              id={`checkbox${index + 1}`}
                              onChange={() => toggleProductSelection(product._id)}
                              type="checkbox"
                              checked={selectedProductsId.includes(product._id)}
                              className="hidden peer"
                            />
                            <label
                              htmlFor={`checkbox${index + 1}`}
                              className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-red-500 border border-gray-400 rounded overflow-hidden"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full fill-white"
                                viewBox="0 0 520 520"
                              >
                                <path
                                  d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                                  data-name="7-Check"
                                  data-original="#000000"
                                />
                              </svg>
                            </label>
                          </td>
                          <td className="py-2 p-3 text-sm text-gray-800">
                            <Image
                              objectFit="cover"
                              width={40}
                              height={40}
                              src={product.images[0]}
                              alt="Product"
                              className="w-10 h-10 rounded-md"
                            />
                          </td>
                          <td className="py-2 capitalize p-3 text-sm text-gray-800"><Link href={`/product/${product._id.toLowerCase()}`}>{product.title}</Link></td>
                          <td className="py-2 p-3 text-sm text-gray-800">
                            <span className="w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs">
                              {product.status === "active" ? "Active" : "Draft"}
                            </span>
                          </td>
                          <td className="py-2 p-3 text-sm text-gray-800">{product.price}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="bg-transparent border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                              </button>
                              <button className="bg-transparent border-none" onClick={() => { setDeleteId(product._id); setShowWarnModal(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                  {allProducts.length == 0 && <tr><td colspan='6'><h1 className='text-center p-3'>No Products Found</h1></td></tr>}
                </tbody>
              </table>


            </div>
            {products.length > productPagination.limit &&
              <ul className="my-10 flex space-x-4 justify-end">
                {currentPage > 1 &&
                  <li onClick={() => handleClickPage(1)} className="flex items-center justify-center shrink-0 hover:bg-gray-50 border-2 cursor-pointer w-10 h-10 rounded-full" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400" viewBox="0 0 55.753 55.753">
                      <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                    </svg>
                  </li>
                }
                <ul className="flex space-x-2">
                  {/* Previous page button */}
                  {currentPage > 1 && (
                    <li onClick={() => handleClickPage(currentPage - 1)} className="flex items-center justify-center flex-shrink-0 border border-red-500 !text-red-500 cursor-pointer text-base font-bold w-10 h-10 rounded-full">
                      {currentPage - 1}
                    </li>
                  )}

                  {/* Current page button */}
                  <li onClick={() => handleClickPage(currentPage)} className="flex items-center justify-center flex-shrink-0 bg-orange-500 border-2 border-orange-500 cursor-pointer text-base font-bold text-white w-10 h-10 rounded-full">
                    {currentPage}
                  </li>

                  {/* Next page button */}
                  {currentPage < totalPages && (
                    <li onClick={() => handleClickPage(currentPage + 1)} className="flex items-center justify-center flex-shrink-0 border border-red-500 !text-red-500 cursor-pointer text-base font-bold w-10 h-10 rounded-full">
                      {currentPage + 1}
                    </li>
                  )}
                </ul>
                {currentPage < totalPages &&
                  <li onClick={() => handleClickPage(totalPages)} className="flex items-center justify-center shrink-0 hover:bg-gray-50 border-2 cursor-pointer w-10 h-10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400 rotate-180" viewBox="0 0 55.753 55.753">
                      <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                    </svg>
                  </li>}
              </ul>
            }
          </main>



          <Footer />
        </div >
      </div >
    </>
  );
}


export async function getServerSideProps() {
  // const baseUrl = process.env.baseUrl;

  try {
    const apiUrl = `${baseUrl}/api/admin/product/getProducts`;

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error('Failed to fetch products');
    }

    return {
      props: {
        products: response.data.products
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error.message);

    return {
      props: {
        products: []
      }
    };
  }
}
