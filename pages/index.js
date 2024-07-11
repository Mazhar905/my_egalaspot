import CategorySection from "@/components/CategorySection";
import NewsletterPopup from "@/components/NewsletterPopup";
import SlideShow from "@/components/SlideShow";
import Topbar from "@/components/Topbar";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductGrid from "@/components/productgrid";
import axios from "axios";

export default function Home({ products }) {
	return (
		<>
			<Topbar />
			<NewsletterPopup />
			<Header />
			<SlideShow />
			<div className="min-h-[400px] pt-10">
				<h2 className="mb-8 font-bold text-center text-3xl">Best Products</h2>
				<ProductGrid products={products} itemsPerRow={4} limit={8} />
			</div>
			<CategorySection title="Our Top Categories" limit={8} className="bg-gray-100" />
			<div className="min-h-[400px]">
				<h2 className="mb-8 font-bold text-center text-3xl">Recents Products</h2>
				<ProductGrid products={products} itemsPerRow={4} limit={8} />
			</div>
			<div className="min-h-[400px] pt-10">
				<h2 className="mb-8 font-bold text-center text-3xl">Featured Collections</h2>
				<ProductGrid products={products} itemsPerRow={4} limit={8} />
			</div>
			<Footer />
		</>
	);
}

export async function getServerSideProps() {
	try {
		const baseUrl = process.env.baseUrl;
		const response = await axios.get(`${baseUrl}/api/admin/product/getProducts`);

		if (!response.status === 200) {
			throw new Error("Network response was not ok");
		}

		const products = response.data.products;

		return {
			props: {
				products,
			},
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		return {
			props: {
				products: [],
			},
		};
	}
}
