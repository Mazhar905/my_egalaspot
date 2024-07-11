const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Order collection
const orderSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            default: ''
        },
        paymentMethod: {
            type: String,
            required: true
        },
        shippingMethod: {
            type: String,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        trackingCode: {
            type: String,
            required: true
        },
        tracking: [
            {
                status: {
                    type: String,
                    required: true
                },
                statusInfo: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true,
                    default: Date.now
                }
            }
        ]
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create a model based on the schema
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
