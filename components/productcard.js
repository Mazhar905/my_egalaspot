import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/context/cart';
import { WishlistContext } from '@/context/wishlist';

function ProductCard({ product, itemsPerRow }) {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const cartProduct = cartItems.find(item => item._id === product._id);
  const isInWishlistProduct = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleWishlist = () => {
    if (isInWishlistProduct) {
      removeFromWishlist(product);
    } else {
      addToWishlist(product);
    }
  };

  const rowClass = itemsPerRow ? "lg:w-1/4" : "";
  return (
    <>
      <div className={`w-full sm:w-1/2 md:w-1/3 ${rowClass} px-2 flex items-stretch justify-stretch`}>
        <div className={`mb-2 flex items-center flex-col bg-white hover:shadow-lg w-full border rounded-xl p-3 cursor-pointer`}>
          <Link href={`/product/${product._id}`} className='relative block w-full h-48'>
            <Image src={product.images[0]} alt={product.thumbnail} layout="fill" className='hover:scale-105 transition' objectFit="contain" />
          </Link>
          <div className="mt-4 w-full mb-2 flex-grow justify-between ">
            <Link href={`/product/${product._id}`} className="flex-1 text-lg font-semibold text-gray-900 mb-0">{product.title}</Link>
          </div>
          <p className="w-full text-md text-gray-800 mt-0">${product.price.toFixed(2)}</p>
          <div className="flex w-full items-center ms-2 my-3">
            {/* Rating stars */}
          </div>
          <div className="w-full flex space-x-2 items-center justify-between">
            <button type="button" onClick={handleToggleWishlist} className={`bg-gray-100 p-2 ${isInWishlistProduct ? 'text-red-500' : ''}`}>
              {isInWishlistProduct ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              )}
            </button>

            {cartProduct ? (
              <div className="flex">
                <button
                  type="button"
                  onClick={() => {
                    removeFromCart(product)
                  }}
                  className="bg-gray-100 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <input
                  className="text-center w-10"
                  type="text"
                  value={cartProduct && cartProduct.quantity}
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product)
                  }}
                  className="bg-gray-100 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className="p-3 bg-red-500 border flex-grow rounded-lg hover:bg-red-600 text-white font-normal text-sm w-full"
              >
                Add To Cart
              </button>
            )}
          </div>
        </div >
      </div >
    </>
  );
}

export default ProductCard;
