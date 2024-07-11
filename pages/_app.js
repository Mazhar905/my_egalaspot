// _app.js
import 'tailwindcss/tailwind.css';
import { CartProvider } from '@/context/cart';
import { WishlistProvider } from '@/context/wishlist';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Component {...pageProps} />
      </WishlistProvider>
    </CartProvider>
  );
}

export default MyApp;
