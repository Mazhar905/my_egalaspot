"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { WishlistContext } from '@/context/wishlist'; // Import WishlistContext
import Loading from '../admin/components/loading';

export default function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useContext(WishlistContext); // Use WishlistContext

    return (
        <>
            <Loading />
            <Header />
            <div className="container max-w-5xl mx-auto mt-10">
                <div className="flex flex-wrap items-start justify-center my-10">
                    <div className="w-full lg:w-3/4 bg-white px-3 py-10">
                        <div className="flex justify-between border-b pr-10 pb-8">
                            <h1 className="font-semibold text-2xl">Wishlist</h1>
                            <h2 className="font-semibold text-2xl">{wishlistItems.length} Items</h2>
                        </div>
                        <table className="min-w-full bg-white">
                            <thead className="whitespace-nowrap">
                                <tr>
                                    <th className="w-2/5 text-start py-3">Product Details</th>
                                    <th className="w-1/5 text-center py-3">Price</th>
                                    <th className="w-1/5 text-center py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistItems.length > 0 ? wishlistItems.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-100">
                                        <td className="p-3 text-left text-sm font-semibold text-gray-800 px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-20">
                                                    <Image className="rounded-md" src={item.images[0]} width={40} height={40} alt={item.title} />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="font-bold capitalize text-xs">{item.title}</p>
                                                    <p className="text-red-500 text-xs">{item.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center text-sm font-semibold text-gray-800">${item.price}</td>
                                        <td className="p-3 text-center text-sm font-semibold text-gray-800">
                                            <button type="button" onClick={() => removeFromWishlist(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={3}><h2 className='text-center p-10 bg-gray-100'>Wishlist Is Empty</h2></td></tr>
                                )}
                            </tbody>
                        </table>
                        <Link href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
