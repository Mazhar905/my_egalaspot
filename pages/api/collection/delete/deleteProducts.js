import mongoose from 'mongoose';
import mongooseConnect from '@/lib/mongoose';
import Product from '@/pages/api/db/model/productSchema';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'DELETE') {
    const { ids } = req.body;

    try {
      // Check if ids is an array and contains valid ObjectId strings
      if (!Array.isArray(ids)) {
        throw new Error('Invalid ids format');
      }

      // Delete products with matching ids
      const deleteResult = await Product.deleteMany({ _id: { $in: ids } });

      res.status(200).json({ message: `${deleteResult.deletedCount} products deleted successfully` });
    } catch (error) {
      console.error('Error deleting products:', error);
      res.status(500).json({ error: 'Failed to delete products' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
