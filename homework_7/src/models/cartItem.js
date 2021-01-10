const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Model = mongoose.model('CartItem', Schema);

module.exports = {
    Model,
    Schema
}
