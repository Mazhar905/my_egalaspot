import mongoose from 'mongoose';
import mongooseConnect from '@/lib/mongoose';
import Collection from '../db/model/collectionSchema';

export default async function handler(req, res) {
    try {
        await mongooseConnect();

        if (req.method === 'GET') {
            const collections = await Collection.find({});
            res.status(200).json({ collections });
        } else if (req.method === 'POST') {
            const { collectionIds } = req.body;

            if (!Array.isArray(collectionIds) || collectionIds.length === 0) {
                return res.status(400).json({ error: 'collectionIds array is required in the request body' });
            }

            const objectIds = collectionIds.map(id => mongoose.Types.ObjectId(id));

            const collections = await Collection.find({ _id: { $in: objectIds } });

            if (collections.length === 0) {
                return res.status(404).json({ error: 'Collections not found for the given IDs' });
            }

            res.status(200).json({ collections });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Error in handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
