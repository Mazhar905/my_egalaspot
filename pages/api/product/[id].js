import mongooseConnect from '@/lib/mongoose';
import Product from '../db/model/productSchema';

export default async function handler(req, res) {
    await mongooseConnect();

    const { id } = req.query; // Destructure id directly from query

    try {
        const product = await Product.findById(id); // Use findById to find by ID
        if (!product) {
            return res.status(404).json({product : []}); // Use backticks for template literals
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error('Error fetching product:', error); // Correct error message
        res.status(500).json({ error: 'Failed to fetch product' }); // Correct error response
    }
}
