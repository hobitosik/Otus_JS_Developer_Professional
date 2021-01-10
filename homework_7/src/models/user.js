const mongoose = require('mongoose')
const Order = require('./order')

const Schema = new mongoose.Schema({
    //id: - за id будет отвечать MongoDB
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    orders: [Order.Schema]
})

const Model = mongoose.model('User', Schema)

module.exports = {
    Model,
    Schema
}
