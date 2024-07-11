"use client";
import Loading from '../components/loading';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Collections({ collections }) {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedCollectionsId, setSelectedCollectionsId] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [showWarnModal, setShowWarnModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const toggleSidebarMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };



  useEffect(() => {
    let filteredCollections;
    if (filter === "all") {
      filteredCollections = [...collections];
    } else if (filter === "active") {
      filteredCollections = collections.filter(col => col.activeStatus === true);
    } else if (filter === "draft") {
      filteredCollections = collections.filter(col => col.activeStatus === false);

    }

    setAllCollections(filteredCollections);
  }, [filter])


  const toggleCollectionSelection = (collectionId) => {
    if (selectedCollectionsId.includes(collectionId)) {
      setSelectedCollectionsId(selectedCollectionsId.filter(id => id !== collectionId));
    } else {
      setSelectedCollectionsId([...selectedCollectionsId, collectionId]);
    }
  };


  const toggleAllCollectionSelection = () => {
    if (selectedCollectionsId.length === allCollections.length) {
      setSelectedCollectionsId([]);
    } else {
      const CollectionIds = allCollections.map(col => col._id);
      setSelectedCollectionsId(CollectionIds);
    }
  };



  const BulkdeleteSelectedCollections = async () => {
    if (selectedCollectionsId.length > 0) {
      try {
        const response = await axios.delete(`/api/admin/collection/delete/deleteCollections`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { ids: selectedCollectionsId }, // Pass data as the 'data' property in Axios for DELETE request
        });
        if (response.status === 200) {

          const { ids } = response.data;

          console.log(ids);
        } else {
          console.error('Delete operation failed:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting products:', error.message);
      }
    }
  };

  const deleteSelectedCollections = async () => {
    if (deleteId === "") {
      return;
    }
    try {
      const response = await axios.delete(`/api/admin/collection/delete/deleteCollections`, {
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
                    Do you want to delete this Collection?
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
            <div className="flex flex-col items-start justify-between pb-6 space-y-4 lg:items-center lg:space-y-0 lg:flex-row">
              <h1 className="text-2xl font-semibold whitespace-nowrap">Collections</h1>
              <Link
                href="/admin/collections/add"
                className="inline-flex items-center justify-center px-4 py-2 space-x-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
              >
                <span>Add Collection</span>
              </Link>
            </div>
            <div className="border-t pt-2 overflow-x-auto">
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
              <table className="min-w-full bg-white">
                <thead className="whitespace-nowrap">

                  <tr>
                    <th className="pl-4 w-8">
                      <input id="checkbox" onClick={() => { toggleAllCollectionSelection() }} type="checkbox" className="hidden peer" />
                      <label
                        htmlFor="checkbox"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
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
                      Title
                    </th>
                    <th className="p-3 text-center text-sm font-semibold text-gray-800">
                      Products
                    </th>
                    <th className="p-3 text-center text-sm font-semibold text-gray-800">
                      Status
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-800">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                  {allCollections?.map((collection, index) => {
                    return (
                      <>
                        <tr key={index + 1} className="odd:bg-gray-50">
                          <td className="pl-4 w-8">
                            <input
                              id={`checkbox${index + 1}`}
                              onChange={() => toggleCollectionSelection(collection._id)}
                              type="checkbox"
                              checked={selectedCollectionsId.includes(collection._id)}
                              className="hidden peer"
                            />
                            <label
                              htmlFor={`checkbox${index + 1}`}
                              className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
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

                          <td className="py-2 p-3 text-sm text-gray-800 capitalize"><Link href={`/collections/${collection.title.toLowerCase()}`}>{collection.title}</Link></td>
                          <td className="py-2 p-3 text-center text-sm text-gray-800">10</td>
                          <td className="py-2 p-3 text-center text-sm text-gray-800">
                            <span className={`w-[68px] mx-auto block text-center py-1 ${collection.activeStatus === true ? "border border-green-500 text-green-600" : "border border-red-500 text-red-600"}  rounded text-xs`}>
                              {collection.activeStatus === true ? "Active" : "Draft"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="bg-transparent border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                              </button>
                              <button className="bg-transparent border-none" onClick={() => { setDeleteId(collection._id); setShowWarnModal(true) }}>
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
                  {allCollections.length == 0 && <tr><td colspan='6'><h1 className=' py-4 bg-gray-100 text-center p-3'>No Collection Found</h1></td></tr>}
                </tbody>


              </table>
            </div>
          </main>



          <Footer />
        </div>
      </div>
    </>
  );
}








export async function getServerSideProps() {
  const baseUrl = process.env.baseUrl;

  try {
    const apiUrl = `${baseUrl}/api/admin/collection/getCollections`;

    const response = await axios.get(apiUrl);

    console.log("response");
    console.log(response);

    if (response.status !== 200) {
      throw new Error('Failed to fetch products');
    }

    return {
      props: {
        collections: response.data.collections
      }
    };
  } catch (error) {
    console.error('Error fetching collections:', error.message);

    return {
      props: {
        collections: []
      }
    };
  }
}
