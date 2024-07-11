"use client";
import React, { useState, useEffect } from 'react';
import Loading from './components/loading';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';
import Link from 'next/link';

export default function Home({products}) {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebarMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const newData = await fetchData();
      setData(newData);
    };

    fetchDataAndSetState();
  }, []);

  // Function to fetch data (replace with your actual data fetching function)
  const fetchData = async () => {
    // Simulating fetching data from an API
    return {
      thisMonthSales: 10000,
      thisMonthOrder: 500,
      totalProducts: products.length,
      totalCollections: 200000
    };
  };



  return (
    <>
      <div className="flex h-screen overflow-y-hidden bg-white">
        <Loading />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebarMenu={toggleSidebarMenu} />

        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header isSidebarOpen={isSidebarOpen} toggleSidebarMenu={toggleSidebarMenu} />
          <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
            <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
              <h1 className="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>

              <Link
                href="/admin/products/add"
                target=""
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 space-x-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
              >
                <span>Add Product</span>
              </Link>
            </div>

            <div className="flex flex-row -mx-2 flex-wrap justify-start">
              {data && (
                <>
                  <div className="w-full mt-3 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                    <div className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg bg-red-500 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-row justify-between w-full">
                          <span className="text-gray-100">This Month Sales</span>
                          <span className="flex text-xs items-center space-x-1 px-1 text-black bg-green-300 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                              <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clip-rule="evenodd" />
                            </svg>
                            <p>14%</p>
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl mt-4 block font-semibold">{data.thisMonthSales}</span>
                    </div>
                  </div>
                  <div className="w-full mt-3 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                    <div className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg bg-red-500 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-row justify-between w-full">
                          <span className="text-gray-100">This Month Order</span>
                          <span className="flex text-xs items-center space-x-1 px-1 text-black bg-green-300 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                              <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clip-rule="evenodd" />
                            </svg>
                            <p>14%</p>
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl mt-4 block font-semibold">{data.thisMonthOrder}</span>
                    </div>
                  </div>
                  <div className="w-full mt-3 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                    <div className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg bg-red-500 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-row justify-between w-full">
                          <span className="text-gray-100">Total Products</span>
                        </div>
                      </div>
                      <span className="text-2xl mt-4 block font-semibold">{data.totalProducts}</span>
                    </div>
                  </div>
                  <div className="w-full mt-3 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                    <div className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg bg-red-500 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-row justify-between w-full">
                          <span className="text-gray-100">Total Collections</span>
                        </div>
                      </div>
                      <span className="text-2xl mt-4 block font-semibold">{data.totalCollections}</span>
                    </div>
                  </div>
                </>
              )}
            </div>



            <h3 className="my-6 text-xl">Users</h3>
            <div className="font-[sans-serif] overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="whitespace-nowrap">
                  <tr>
                    <th className="pl-4 w-8">
                      <input id="checkbox1" type="checkbox" className="hidden peer" />
                      <label for="checkbox1"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check" data-original="#000000" />
                        </svg>
                      </label>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      Company
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      Status
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-500 inline cursor-pointer ml-2"
                        viewBox="0 0 401.998 401.998">
                        <path
                          d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                          data-original="#000000" />
                      </svg>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      Type
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-500 inline cursor-pointer ml-2"
                        viewBox="0 0 401.998 401.998">
                        <path
                          d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                          data-original="#000000" />
                      </svg>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      SKU
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      Contact
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      Rating
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-500 inline cursor-pointer ml-2"
                        viewBox="0 0 401.998 401.998">
                        <path
                          d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                          data-original="#000000" />
                      </svg>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-800">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                  <tr className="odd:bg-blue-50">
                    <td className="pl-4 w-8">
                      <input id="checkbox2" type="checkbox" className="hidden peer" />
                      <label for="checkbox2"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check" data-original="#000000" />
                        </svg>
                      </label>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Louis Vuitton
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <span
                        className="w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs">Active</span>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Bravo
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      8066
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <div className="flex items-center cursor-pointer">
                        <img src='https://readymadeui.com/profile_4.webp' className="w-7 h-7 rounded-full shrink-0" />
                        <div className="ml-4">
                          <p className="text-sm text-gray-800">Gladys Jones</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                    </td>
                    <td className="p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" data-original="#000000" />
                        <circle cx="4" cy="12" r="2" data-original="#000000" />
                        <circle cx="20" cy="12" r="2" data-original="#000000" />
                      </svg>
                    </td>
                  </tr>

                  <tr className="odd:bg-blue-50">
                    <td className="pl-4 w-8">
                      <input id="checkbox3" type="checkbox" className="hidden peer" />
                      <label for="checkbox3"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check" data-original="#000000" />
                        </svg>
                      </label>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Mitsubishi
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <span
                        className="w-[68px] block text-center py-1 border border-yellow-500 text-yellow-600 rounded text-xs">Pending</span>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Bravo
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      9055
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <div className="flex items-center cursor-pointer">
                        <img src='https://readymadeui.com/profile_3.webp' className="w-7 h-7 rounded-full shrink-0" />
                        <div className="ml-4">
                          <p className="text-sm text-gray-800">Jorge Black</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                      <svg className="w-[18px] h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                    </td>
                    <td className="p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" data-original="#000000" />
                        <circle cx="4" cy="12" r="2" data-original="#000000" />
                        <circle cx="20" cy="12" r="2" data-original="#000000" />
                      </svg>
                    </td>
                  </tr>

                  <tr className="odd:bg-blue-50">
                    <td className="pl-4 w-8">
                      <input id="checkbox4" type="checkbox" className="hidden peer" />
                      <label for="checkbox4"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check" data-original="#000000" />
                        </svg>
                      </label>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      IBM
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <span
                        className="w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs">Active</span>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Gold
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      7011
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <div className="flex items-center cursor-pointer">
                        <img src='https://readymadeui.com/profile_2.webp' className="w-7 h-7 rounded-full shrink-0" />
                        <div className="ml-4">
                          <p className="text-sm text-gray-800">Evan Flores</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                    </td>
                    <td className="p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" data-original="#000000" />
                        <circle cx="4" cy="12" r="2" data-original="#000000" />
                        <circle cx="20" cy="12" r="2" data-original="#000000" />
                      </svg>
                    </td>
                  </tr>

                  <tr className="odd:bg-blue-50">
                    <td className="pl-4 w-8">
                      <input id="checkbox5" type="checkbox" className="hidden peer" />
                      <label for="checkbox5"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check" data-original="#000000" />
                        </svg>
                      </label>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Starbucks
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <span
                        className="w-[68px] block text-center py-1 border border-yellow-500 text-yellow-600 rounded text-xs">Pending</span>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Alfa
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      6605
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <div className="flex items-center cursor-pointer">
                        <img src='https://readymadeui.com/profile_5.webp' className="w-7 h-7 rounded-full shrink-0" />
                        <div className="ml-4">
                          <p className="text-sm text-gray-800">Jennie Cooper</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                      <svg className="w-[18px] h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                    </td>
                    <td className="p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" data-original="#000000" />
                        <circle cx="4" cy="12" r="2" data-original="#000000" />
                        <circle cx="20" cy="12" r="2" data-original="#000000" />
                      </svg>
                    </td>
                  </tr>

                  <tr className="odd:bg-blue-50">
                    <td className="pl-4 w-8">
                      <input id="checkbox6" type="checkbox" className="hidden peer" />
                      <label for="checkbox6"
                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                          <path
                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                            data-name="7-Check" data-original="#000000" />
                        </svg>
                      </label>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      The Walt Disney
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <span
                        className="w-[68px] block text-center py-1 border border-yellow-500 text-yellow-600 rounded text-xs">Pending</span>
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      Gold
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      9956
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      <div className="flex items-center cursor-pointer">
                        <img src='https://readymadeui.com/profile_6.webp' className="w-7 h-7 rounded-full shrink-0" />
                        <div className="ml-4">
                          <p className="text-sm text-gray-800">Philip Steward</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#facc15" />
                      </svg>
                      <svg className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                      <svg className="w-[18px] h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                          fill="#CED5D8" />
                      </svg>
                    </td>
                    <td className="p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" data-original="#000000" />
                        <circle cx="4" cy="12" r="2" data-original="#000000" />
                        <circle cx="20" cy="12" r="2" data-original="#000000" />
                      </svg>
                    </td>
                  </tr>
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
  try {
    const baseUrl = process.env.baseUrl;
    const response = await fetch(`${baseUrl}/api/admin/product/getProducts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const products = data.products;
    return {
      props: {
        products
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
}
