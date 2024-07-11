import mongooseConnect from '@/lib/mongoose';
import Product from '@/pages/api/db/model/productSchema'; // Adjust the path to your Mongoose Product model/schema

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await mongooseConnect();

  // Ensure req.body is an array of products
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Invalid request body: expecting an array of products' });
  }


  try {
    // Insert multiple products into MongoDB
    const insertedProducts = await Product.insertMany(req.body);

    res.status(200).json({ message: 'Products added successfully', products: insertedProducts });
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Failed to save products' });
  }
}
