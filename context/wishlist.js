// @/context/wishlist.js
import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        setWishlistItems(localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : []);
    }, [])

    const addToWishlist = (item) => {
        const isItemInWishlist = wishlistItems.find((wishlistItem) => wishlistItem._id === item._id);
        if (!isItemInWishlist) {
            const updatedWishlistItems = [...wishlistItems, item];
            setWishlistItems(updatedWishlistItems);
            localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));
        }
    };

    const removeFromWishlist = (item) => {
        const updatedWishlistItems = wishlistItems.filter((wishlistItem) => wishlistItem._id !== item._id);
        setWishlistItems(updatedWishlistItems);
        localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));
    };

    const isInWishlist = (itemId) => {
        return wishlistItems.some(item => item._id === itemId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                isInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
