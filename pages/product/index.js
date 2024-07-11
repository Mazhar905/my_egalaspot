"use client";
import Footer from '@/components/footer'
import Header from '@/components/header'
import TopProducts from '@/components/productgrid'
import Filter from '@/components/Filters';
import React, { useState } from 'react'
import Image from 'next/image';
import collectionBanner from "@/public/bg-img/collection-banner.jpeg"
import Loading from '../admin/components/loading';
import axios from 'axios';

export default function page({ products }) {


    return (
        <>
            <Loading />
            <Header />
            <div className="px-3">
                <div className="section_image my-4 rounded-lg overflow-hidden relative" style={{ maxHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Image src={collectionBanner} layout='responsive' objectFit='contain' alt="banner" />
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-70 content-none flex items-center justify-center'>
                    </div>
                    <h1 className='text-white text-3xl capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Collection</h1>
                </div>
                <div className="flex flex-wrap flex-col items-start lg:flex-row">
                    <div className="main w-full">
                        <TopProducts products={products} limit={3000} sectionName="All Collections" />
                    </div>
                </div>
            </div >




            <Footer />
        </>
    )
}



export async function getServerSideProps() {
    try {
        const baseUrl = process.env.baseUrl;
        const response = await axios.get(`${baseUrl}/api/admin/product/getProducts`);

        if (!response.status === 200) {
            throw new Error('Network response was not ok');
        }

        const products = response.data.products;

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