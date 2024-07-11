"use-client";
import Link from 'next/link'
import { useEffect } from "react"
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '@/context/cart';

function Thank() {
    const router = useRouter();
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
        const timeout = setTimeout(() => {
            router.push("/");
        }, 3000);

        return () => clearTimeout(timeout); // Clean up timeout on unmount

    }, [router]);

    return (
        <>
            <div className="flex px-10 h-screen items-center justify-center">
                <div>
                    <div className="flex flex-col items-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-red-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-4xl font-bold text-center">Thank You for Placing the Order !</h1>
                        <p className='text-center !mb-6'>Thank you for purchasing and showing the interest! Check your email for a link to the guide.</p>
                        <Link href="/"
                            className="inline-flex items-center rounded border border-red-600 bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            <span className="text-sm font-medium"> Home </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Thank
