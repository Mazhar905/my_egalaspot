import mongooseConnect from '@/lib/mongoose';
import Collection from '../../db/model/collectionSchema';

export default async function handler(req, res) {
    await mongooseConnect();

    try {
        const collections = await Collection.find({}); // Fetch all collections from "collections" collection
        res.status(200).json({collections});
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ error: 'Failed to fetch collections' });
    }
}
