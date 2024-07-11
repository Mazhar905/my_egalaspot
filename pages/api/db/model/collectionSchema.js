const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const CollectionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    condition: {
        name: {
            type: String,
            enum: ['tag','title'],
            required: true
        },
        condition_filter: {
            type: String,
            enum: ['equal', 'notEqual', 'greaterThan', 'lessThan', 'contains'],
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    activeStatus: {
        type: Boolean,
        default: true
    }
});

// Create a model based on the schema
const Collection = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);

module.exports = Collection;
