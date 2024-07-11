import Image from "next/image"
import newsletter from "../public/newsletter.png"
import { useEffect, useState } from "react"
import 'animate.css';

function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState();

    useEffect(() => {
        setTimeout(() => {
            const oneWeek = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
            const currentTime = new Date().getTime();

            if (currentTime - parseInt(localStorage.getItem("lastVisitTime")) < oneWeek) {
                setIsOpen(false);
            } else {
                localStorage.setItem("lastVisitTime", new Date().getTime().toString());
                setIsOpen(true);
            }
        }, 2000);
    }, [])

    const handleClosePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={` z-50 flex items-center justify-center fixed top-0 w-screen ${!isOpen ? "hidden" : ""} h-screen bg-[#00000066]`}>
            <div className="max-w-lg md:max-w-none w-11/12 relative z-20 md:w-2/3 lg:w-2/3 bg-white flex items-center mx-auto rounded-md overflow-hidden border shadow-md">
                <div className="hidden md:flex md:w-1/2 h-full">
                    <Image
                        src={newsletter}
                        className="animate__animated animate__fadeInLeft w-full h-full"
                        alt="newsletter"
                    />
                </div>
                <div className="animate__animated animate__fadeInUp py-8 w-full md:w-1/2 h-full flex flex-col justify-center p-4 md:p-8 gap-4 relative">

                    <h3 className="text-xl font-bold text-gray-800">Subscribe Newsletter.</h3>
                    <p className="text-md text-gray-600 font-semibold">
                        Subscribe the <span className="text-lg font-semibold">Anon</span> to get
                        latest products and discount update.
                    </p>
                    <input className="border p-2" type="email" placeholder="Email Address" />
                    <button
                        className="rounded-md w-full self-center py-2 px-3 bg-red-500 text-white hover:bg-red-600"
                    >
                        SUBSCRIBE
                    </button>
                </div>
                <button onClick={() => { handleClosePopup() }} className="closeButton absolute top-3 right-3 text-2xl hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default NewsletterPopup;
