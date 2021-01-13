const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

const { CartItemType, CartItemInputType } = require('./cart-item')

const User = require('../models/user').Model
const Order = require('../models/order').Model

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: ()=>({
        id: { type: new GraphQLNonNull( GraphQLID )},
        items: {
            type: new GraphQLList( new GraphQLNonNull( CartItemType ))
        },
        user_id: { type: new GraphQLNonNull( GraphQLID ) },
        user: {
            type: UserType,
            resolve( parent, args ){
                return User.findById( parent.user_id );
            }
        }
    })
})

const OrderInputType = new GraphQLInputObjectType({
    name: "OrderInput",
    fields: ()=>({
        items: {
            type: new GraphQLList( new GraphQLNonNull( CartItemInputType ))
        }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: ()=>({
        id: { type: new GraphQLNonNull( GraphQLID )},
        name: { type: new GraphQLNonNull( GraphQLString )},
        email: { type: new GraphQLNonNull( GraphQLString )},
        orders: {
            type: new GraphQLList( OrderType ),
            resolve( parent, args ){
                return Order.find({ user_id: parent.id });
            }
        }
    })
})

const UserInputType = new GraphQLInputObjectType({
    name: "UserInput",
    fields: ()=>({
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

module.exports = {
    UserType,
    UserInputType,
    OrderType,
    OrderInputType
}
