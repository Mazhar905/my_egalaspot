import mongooseConnect from '@/lib/mongoose';
import Product from '../../db/model/productSchema';

export default async function handler(req, res) {
    await mongooseConnect();

    try {
        const products = await Product.find({}); // Fetch all products from "products" collection
        res.status(200).json({products});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}
