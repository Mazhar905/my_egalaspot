import dotenv from 'dotenv';
dotenv.config();
import mongooseConnect from '@/lib/mongoose';
import Product from '@/pages/api/db/model/productSchema';

export default async function handler(req, res) {

    await mongooseConnect();

    // Access parsed form fields from req.body
    const { title, description, quantity, tags, price, attributes, images } = req.body;

    console.log(req.body);

    try {

        // Create a new product instance
        const newProduct = await Product.create({
            title,
            description,
            tags,
            attributes,
            quantity,
            price,
            images
        });

        if (await newProduct.save()) {
            res.status(200).json({ message: 'Product added successfully' , product : newProduct });
        }

    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'Failed to save product' });
    }
}




