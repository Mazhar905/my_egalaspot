import mongoose from 'mongoose';
import mongooseConnect from '@/lib/mongoose';
import Product from '../db/model/productSchema';

export default async function handler(req, res) {
    try {
        await mongooseConnect();

        if (req.method === 'GET') {
            const products = await Product.find({});
            res.status(200).json({ products });
        } else if (req.method === 'POST') {
            const { productIds } = req.body;

            // Validate productIds
            if (!Array.isArray(productIds) || productIds.length === 0) {
                return res.status(400).json({ error: 'productIds array is required in the request body' });
            }

            // Convert productIds to ObjectId
            const objectIds = productIds.map(id => mongoose.Types.ObjectId(id));

            const products = await Product.find({ _id: { $in: objectIds } });

            if (products.length === 0) {
                return res.status(404).json({ error: 'Products not found for the given IDs' });
            }

            res.status(200).json({ products });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Error in handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
