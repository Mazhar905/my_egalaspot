import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import logo from "@/public/logo.png";
import { CartContext } from '@/context/cart.js'
import { WishlistContext } from '@/context/wishlist.js'; // Import WishlistContext
import Loading from "@/pages/admin/components/loading";

const Dropdown = ({ isOpen }) => {
    return isOpen ? (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
                <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Login
                </Link>
                <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Register
                </Link>
            </div>
        </div>
    ) : null;
};

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mainMenu, setMainMenu] = useState([]);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const { cartItems, getCartTotal } = useContext(CartContext);
    const { wishlistItems } = useContext(WishlistContext); // Access wishlistItems from WishlistContext
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('/api/collection/getCollections');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMainMenu(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchQuery.trim().length > 0) {
                const results = mainMenu.filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(results);
                setShowSearchDropdown(results.length === 1);
            } else {
                setSearchResults([]);
                setShowSearchDropdown(false);
            }
        }, 300);
        return () => clearTimeout(delaySearch);
    }, [searchQuery, mainMenu]);

    const handleMouseEnter = (index) => {
        setOpenSubMenu(index);
    };

    const handleMouseLeave = () => {
        setOpenSubMenu(null);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <Loading />
            <header className='shadow-md bg-white tracking-wide relative z-30'>
                <section className='flex items-center flex-wrap lg:justify-center gap-4 py-3 sm:px-2 px-4 border-gray-200 border-b min-h-[75px]'>
                    <div className='left-10 absolute z-50 bg-gray-100 flex px-4 py-3 rounded max-lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px" className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block">
                            <path d="M190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                        </svg>
                        <input type='text' onChange={(e) => { handleSearchInputChange(e) }} placeholder='Search...' className="outline-none bg-transparent w-full text-sm" />
                        {showSearchDropdown && (
                            <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                                {searchResults.map((result, index) => (
                                    <Link key={index} href={result.link}>
                                        <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            {result.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/" className="shrink-0">
                        <Image src={logo} alt="logo" className='md:w-[170px] w-36' />
                    </Link>

                    <div className="lg:absolute lg:right-10 flex items-center ml-auto space-x-8">
                        <Link href={"/wishlist"} className="relative" data-tooltip-id="my-tooltip" data-tooltip-content="Wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            {/* Display wishlistItems.length as count */}
                            <span className="absolute -right-2 left-auto -ml-1 -top-1 rounded-full bg-black px-1 py-0 text-xs text-white">{wishlistItems.length}</span>
                        </Link>
                        <Link href={"/cart"} className="relative" data-tooltip-id="my-tooltip" data-tooltip-content="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {/* Display cartItems.length as count */}
                            <span className="absolute -right-2 left-auto -ml-1 -top-1 rounded-full bg-black px-1 py-0 text-xs text-white">{cartItems.length}</span>
                        </Link>
                        <div className="relative -mb-1">
                            <button
                                onClick={toggleDropdown}
                                className="inline-block cursor-pointer border-gray-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </button>
                            <Dropdown isOpen={dropdownOpen} />
                        </div>
                        <div className='flex ms-0 lg:hidden' onClick={toggleMenu}>
                            <button>
                                <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                <div className='flex flex-wrap justify-center lg:px-10 lg:py-3 relative'>
                    <div id="collapseMenu" className={`${isMenuOpen ? "" : "hidden"} lg:flex max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}>
                        <button onClick={toggleMenu} className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                            </svg>
                        </button>

                        <ul className='items-center lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                            <li className='capitalize outline-none max-lg:border-b max-lg:pb-4 px-3 lg:hidden'>
                                <Link href="/">
                                    <Image src={logo} alt="logo" className='w-36' />
                                </Link>
                            </li>
                            <li className='capitalize outline-none max-lg:border-b max-lg:px-3 max-lg:py-3 relative'>
                                <Link href="/product">
                                    Products
                                </Link>
                            </li>
                            {mainMenu.collections?.slice(0, 10).map((menuItem, index) => (
                                <li key={index} className='capitalize outline-none max-lg:border-b max-lg:px-3 max-lg:py-3 relative'>
                                    <div
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Link href={`/collection/${menuItem.title.toLowerCase()}`} className='hover:text-[#F04725] hover:fill-[#F04725] text-gray-600 font-semibold text-[15px] block py-1'>
                                            {menuItem.title}
                                            {menuItem.subMenu && <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24">
                                                <path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" />
                                            </svg>}
                                        </Link>
                                        {menuItem.subMenu && openSubMenu === index && (
                                            <ul className='absolute top-9 pt-2 md:pt-0 left-0 z-50 bg-white shadow-lg overflow-hidden min-w-[250px] transition-max-h duration-500'>
                                                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                                                    <li key={subIndex} className='ps-3 yborder-b py-3'>
                                                        <Link href={subMenuItem.link} className='hover:text-[#F04725] hover:fill-[#F04725] text-gray-600 font-semibold text-[15px] block'>
                                                            {subMenuItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </li>
                            ))}
                            <li className='capitalize outline-none max-lg:border-b max-lg:px-3 max-lg:py-3 relative'>
                                <Link href="/contact">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='hidden ml-auto lg:hidden' onClick={toggleMenu}>
                        <button>
                            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header;
