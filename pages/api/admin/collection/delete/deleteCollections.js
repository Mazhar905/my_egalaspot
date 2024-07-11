import mongoose from 'mongoose';
import mongooseConnect from '@/lib/mongoose';
import Collection from '@/pages/api/db/model/collectionSchema';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'DELETE') {
    const { ids } = req.body;

    try {
      if (!Array.isArray(ids)) {
        throw new Error('Invalid ids format');
      }

      const deleteResult = await Collection.deleteMany({ _id: { $in: ids } });

      res.status(200).json({ message: `${deleteResult.deletedCount} collections deleted successfully` });
    } catch (error) {
      console.error('Error deleting collections:', error);
      res.status(500).json({ error: 'Failed to delete collections' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
