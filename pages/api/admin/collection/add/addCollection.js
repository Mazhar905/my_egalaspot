import dotenv from 'dotenv';
dotenv.config();
import mongooseConnect from '@/lib/mongoose'; // Ensure this connection function works correctly
import Collection from '@/pages/api/db/model/collectionSchema';

export default async function handler(req, res) {
    await mongooseConnect(); // Ensure this connects to your MongoDB correctly
    
    try {
        // Create a new collection instance
        const newCollection = await Collection.create(req.body);
        res.status(200).json(newCollection);
    } catch (error) {
        console.error('Error saving collection:', error);
        res.status(500).json({ error: 'Failed to save collection' });
    }
}
