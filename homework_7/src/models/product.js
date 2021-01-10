const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    //id: - за id будет отвечать MongoDB
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['KITCHEN', 'HOUSE', 'HEALTH', 'COMPUTER', 'SMARTPHONE', 'TOOL', 'ACCESSORY']
    },
    description: String,
    status: {
        type: String,
        enum: ['SALE', 'NO_STOCK', 'NEW']
    },
    images: [{
        type: String,
        required: true
    }]
})

const Model = mongoose.model('Product', Schema)

module.exports = {
    Model,
    Schema
}
