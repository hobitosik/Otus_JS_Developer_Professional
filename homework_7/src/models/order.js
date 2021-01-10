const mongoose = require('mongoose')
const CartItem = require('./cartItem')

const Schema = new mongoose.Schema({
    //id: - за id будет отвечать MongoDB
    items: [{
        type: CartItem.Schema,
        required: true
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Model = mongoose.model('Order', Schema)

module.exports = {
    Model,
    Schema
}
