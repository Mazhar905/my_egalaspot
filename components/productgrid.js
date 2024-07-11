import ProductCard from './productcard';
import { useState } from 'react';



function ProductGrid({ products, limit, itemsPerRow }) {
  // Check if a limit is provided and slice the products array accordingly
  products = limit ? products.slice(0, limit) : products;


  const [productPagination, setProductPagination] = useState({
    page: 1,
    offset: 0,
    limit: 60
  });

  const currentPage = productPagination.page; // Assuming you have the current page index
  const totalPages = Math.ceil(products.length / productPagination.limit);

  const handleClickPage = (page) => {
    const newOffset = (page - 1) * productPagination.limit;
    setProductPagination({
      ...productPagination,
      page: page,
      offset: newOffset
    });
  };


  return (
    <>
      <div className="mx-auto lg:max-w-6xl md:max-w-4xl">
        <div className="flex flex-wrap justify-start w-full items-stretch">
          {/* Map over the limited products array */}
          {products.length > 0 && (
            products.slice(productPagination.offset, productPagination.offset + productPagination.limit)?.map((product, index) => {
              return <ProductCard key={product._id} itemsPerRow={itemsPerRow} product={product} />
            })
          )}



        </div>
        {products.length > productPagination.limit &&
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
    </>
  );
}

export default ProductGrid;
