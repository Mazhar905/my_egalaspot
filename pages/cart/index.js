"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context/cart';
import Loading from '../admin/components/loading';

export default function Cart() {
    const { cartItems, addToCart, removeFromCart, getCartTotal } = useContext(CartContext);
    // console.log("cartItems:", cartItems);

    return (
        <>
            <Loading />
            <Header />
            <div className="container max-w-5xl mx-auto mt-10">
                <div className="flex flex-wrap items-start justify-centery my-10">
                    <div className="w-full lg:w-3/4 bg-white px-3 py-10">
                        <div className="flex justify-between border-b pr-10 pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
                        </div>
                        <table className="min-w-full bg-white">
                            <thead className="whitespace-nowrap">
                                <tr>
                                    <th className="w-2/5 text-start py-3">Product Details</th>
                                    <th className="w-1/5 text-center py-3">Quantity</th>
                                    <th className="w-1/5 text-center py-3">Price</th>
                                    <th className="w-1/5 text-center py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length > 0 ? cartItems.map(item => {
                                    return (
                                        <tr key={item._id} className="hover:bg-gray-100">
                                            <td className="p-3 text-left text-sm font-semibold text-gray-800 px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-20">
                                                        <Image className="rounded-md" src={item.images[0]} width={40} height={40} alt={item.title} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <Link href={`product/${item._id}`} className="font-bold capitalize text-xs">{item.title}</Link>
                                                        <p className="text-red-500 text-xs">{item.brand}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center text-sm font-semibold text-gray-800">
                                                <div className="p-3 text-left text-sm font-semibold text-gray-800 flex items-center">
                                                    <button type='button' onClick={() => {
                                                        removeFromCart(item)
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                                        </svg>
                                                    </button>
                                                    <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />
                                                    <button type="button" onClick={() => {
                                                        addToCart(item)
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </td>
                                            <td className=" p-3 text-center text-sm font-semibold text-gray-800">${item.price}</td>
                                            <td className="text-center p-3 text-sm font-semibold text-gray-800">${item.price * item.quantity}</td>

                                        </tr>
                                    )
                                }) : (
                                    <tr><td colSpan={4}><h2 className='text-center p-10 bg-gray-100'>Cart Is Empty</h2></td></tr>
                                )}
                            </tbody>
                        </table>



                        <Link href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </Link>
                    </div>
                    <div id="summary" className="w-full lg:w-1/4 px-3 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
                            <span className="font-semibold text-sm">{getCartTotal()}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>Standard shipping - $10.00</option>
                            </select>
                        </div>
                        <div className="pt-10">
                            <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="bg-gray-100 p-2 text-sm w-full" />
                        </div>
                        <button className="mt-3 bg-red-500 hover:bg-red-600 w-full px-5 py-2 text-sm text-white uppercase">Apply</button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>$600</span>
                            </div>
                            <Link href="/checkout" className="flex items-center justify-center bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</Link>                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
