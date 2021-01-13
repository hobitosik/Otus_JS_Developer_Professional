const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

const { ProductType, ProductInputType } = require('./product')

const Product = require('../models/product').Model

const CartItemType = new GraphQLObjectType({
    name: "CartItem",
    fields: ()=>({
        product_id: { type: new GraphQLNonNull( GraphQLID )},
        quantity: { type: new GraphQLNonNull( GraphQLInt )},
        product: {
            type: ProductType,
            resolve( parent, args ){
                return Product.findById( parent.product_id );
            }
        }
    })
})

const CartItemInputType = new GraphQLInputObjectType({
    name: "CartItemInput",
    fields: ()=>({
        product_id: { type: new GraphQLNonNull( GraphQLID )},
        quantity: { type: new GraphQLNonNull( GraphQLInt )}
    })
})

module.exports = {
    CartItemType,
    CartItemInputType
}
