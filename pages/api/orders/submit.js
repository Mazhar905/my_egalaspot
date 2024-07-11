// pages/api/orders/submit.js

import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import Order from '../db/model/orderSchema';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      postalCode,
      paymentMethod,
      shippingMethod,
      totalAmount,
    } = req.body;

    try {
      // Find the latest order to determine the next tracking code
      const lastOrder = await Order.findOne().sort({ createdAt: -1 });

      // Generate tracking code for the new order
      let nextTrackingCode = '7865040000'; // Starting tracking code
      if (lastOrder && lastOrder.trackingCode) {
        const lastTrackingNumber = parseInt(lastOrder.trackingCode.substr(-4));
        nextTrackingCode = '786504' + (lastTrackingNumber + 1).toString().padStart(4, '0');
      }

      // Create a new order instance
      const newOrder = new Order({
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        postalCode,
        paymentMethod,
        shippingMethod,
        totalAmount,
        trackingCode: nextTrackingCode,
        tracking: [{ status: 'pending', statusInfo: 'Order in pending' }]
      });

      // Save the new order
      const savedOrder = await newOrder.save();

      // Update order with initial tracking status
      savedOrder.tracking.push({
        status: 'order_placed',
        statusInfo: 'Order placed successfully',
        date: new Date()
      });

      // Save updated order with tracking information
      await savedOrder.save();

      res.status(200).json({ success: true, trackingCode: nextTrackingCode });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
