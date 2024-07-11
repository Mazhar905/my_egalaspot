import Footer from '@/components/footer';
import Header from '@/components/header';
import TopProducts from '@/components/productgrid';
import Filter from '@/components/Filters';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import collectionBanner from "@/public/bg-img/collection-banner.jpeg";
import Loading from '../admin/components/loading';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Page({ products }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [uniqueColors, setUniqueColors] = useState([]);
    const [uniqueSizes, setUniqueSizes] = useState([]);
    const [productPagination, setProductPagination] = useState({
        page: 1,
        limit: 40
    });
    const params = useParams();
    const router = useRouter();
    const { query } = router;

    const currentPage = productPagination.page;
    const totalPages = Math.ceil(filteredProducts.length / productPagination.limit);

    const handleClickPage = (page) => {
        setProductPagination({
            ...productPagination,
            page: page
        });
    };

    useEffect(() => {
        let filteredPro = [];

        if (params.slug && !query.color && !query.size) {
            filteredPro = products.filter(product =>
                product.tags.includes(params.slug)
            );
        } else if (params.slug && query.color && !query.size) {
            filteredPro = products.filter(product =>
                product.tags.includes(params.slug) &&
                product.attributes.colors.includes(query.color)
            );
        } else if (params.slug && query.color && query.size) {
            filteredPro = products.filter(product =>
                product.tags.includes(params.slug) &&
                product.attributes.colors.includes(query.color) &&
                product.attributes.sizes.includes(query.size)
            );
        } else {
            filteredPro = products;
        }

        setFilteredProducts(filteredPro);

        let allColors = [];
        let allSizes = [];
        products.forEach(product => {
            allColors = allColors.concat(product.attributes.colors);
            allSizes = allSizes.concat(product.attributes.sizes);
        });

        const uniqueColors = [...new Set(allColors)].map((color, index) => ({
            id: `color_${index + 1}`,
            name: color.toLowerCase()
        }));

        const uniqueSizes = [...new Set(allSizes)].map((size, index) => ({
            id: `size_${index + 1}`,
            name: size
        }));

        setUniqueColors(uniqueColors);
        setUniqueSizes(uniqueSizes);
    }, [products, params.slug, query.color, query.size]);

    const startIndex = (currentPage - 1) * productPagination.limit;
    const endIndex = currentPage * productPagination.limit;

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
                    <div className='space-y-2 p-8 w-full rounded-lg lg:w-1/4 py-4'>
                        <Filter valueKey='size' name='Sizes' data={uniqueSizes} />
                        <Filter valueKey='color' name='Colors' data={uniqueColors} />
                    </div>

                    <div className="main w-full mx-auto mt-6 lg:w-3/4">
                        <TopProducts products={filteredProducts.slice(startIndex, endIndex)} sectionName="All Collections" />

                        {filteredProducts.length > productPagination.limit &&
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
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    try {
        const baseUrl = process.env.baseUrl;
        const response = await axios.get(`${baseUrl}/api/admin/product/getProducts`);

        if (response.status !== 200) {
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
