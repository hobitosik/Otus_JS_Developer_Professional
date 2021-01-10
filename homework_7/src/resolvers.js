// импортируем модель (mongoose)
const User = require('./models/user').Model
const Product = require('./models/product').Model
const Order = require('./models/order').Model
const CartItem = require('./models/cartItem').Model

const resolvers = {
    // Query:
    user: ({ id }) => User.findById(id),
    users: () => User.find({}),

    product: ({ id }) => Product.findById(id),
    products: () => Product.find({}),
    productsByCategory: ({ category }) => Product.find({ category: category }).exec(),
    productsByStatus: ({ status }) => Product.find({ status: status }).exec(),

    order: ({ id }) => Order.findById(id),
    orders: () => Order.find({}),
    
    cartItems: () => CartItem.find({}),

    // Mutation:
    createUser: ({ input })=>{
        return User.create( input )
    },
    updateUser: ({ id, input })=>{
        return User.findByIdAndUpdate( id, input, { new: true })
    },
    deleteUser: ({ id }) => {
        return User.deleteOne({ _id: id }).then(() => {
            return id
        })
    },

    createProduct: ({ input })=>{
        return Product.create( input )
    },
    updateProduct: ({ id, input })=>{
        return Product.findByIdAndUpdate( id, input, { new: true })
    },
    deleteProduct: ({ id }) => {
        return Product.deleteOne({ _id: id }).then(() => {
            return id
        })
    },
    
    createOrder: ({ input })=>{
        // let user = User.findOne( input['user_id'] );
        let newOrder = Order.create( input );
        // User.findByIdAndUpdate( input['user_id'], {orders: [newOrder]}, { new: true })
        // user.update({$push: {orders: newOrder}})
        return newOrder
    },
    updateOrder: ({ id, input })=>{
        return Order.findByIdAndUpdate( id, input, { new: true })
    },
    
    createCartItem: ({ input })=>{
        return CartItem.create( input )
    },
};

module.exports = resolvers;
