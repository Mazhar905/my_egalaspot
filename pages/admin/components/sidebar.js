import React, { useState } from 'react'
import Link from 'next/link';
import logo from "@/public/logo-icon.png"
import Image from 'next/image';

export default function Sidebar({ isSidebarOpen , toggleSidebarMenu }) {


    return (
        <>
            {/* Sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden"
                    style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
                ></div>
            )}
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-52 max-h-screen overflow-hidden transition-all bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none ${!isSidebarOpen && '-translate-x-full lg:translate-x-0 lg:w-20'
                    }`}
            >




                <div className="flex items-center justify-between flex-shrink-0 p-2">
                    <Link href={"/admin"} className='mx-auto block'><Image src={logo} alt='logo' width={40} /></Link>
                    <Link href={"/admin"} onClick={() => { toggleSidebarMenu() }} className="p-2 rounded-md lg:hidden">
                        <svg
                            className="w-6 h-6 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>


                <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
                    <ul className="p-2 space-y-4 overflow-hidden">
                        <li>
                            <Link
                                href="/admin"
                                className={`text-sm font-semibold flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${!isSidebarOpen && 'justify-center'
                                    }`}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                </span>
                                <span className={!isSidebarOpen && 'lg:hidden'}>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/products"
                                className={`text-sm font-semibold flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${!isSidebarOpen && 'justify-center'
                                    }`}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>

                                </span>
                                <span className={!isSidebarOpen && 'lg:hidden'}>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/collections"
                                className={`text-sm font-semibold flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${!isSidebarOpen && 'justify-center'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>

                                <span className={!isSidebarOpen && 'lg:hidden'}>Collections</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/orders"
                                className={`text-sm font-semibold flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${!isSidebarOpen && 'justify-center'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
</svg>



                                <span className={!isSidebarOpen && 'lg:hidden'}>Orders</span>
                            </Link>
                        </li>
                    </ul>
                </nav>



                <div className="flex-shrink-0 p-2 border-t max-h-14">
                    <button className="text-xs font-semibold flex items-center justify-center w-full px-4 py-2 space-x-1 tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none ">
                        <span>
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </span>
                        <span className={`${!isSidebarOpen && 'lg:hidden'}`}> Logout </span>
                    </button>
                </div>
                {/* Your sidebar content */}
            </aside>
        </>
    )
}
