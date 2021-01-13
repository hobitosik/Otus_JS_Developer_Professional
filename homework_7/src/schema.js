const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const User = require('./models/user').Model
const Product = require('./models/product').Model
const Order = require('./models/order').Model

const { UserType, UserInputType, OrderType, OrderInputType } = require('./gql-types/user')
const { ProductEnumType, StatusEnumType, ProductType, ProductInputType } = require('./gql-types/product')
const { CartItemInputType } = require('./gql-types/cart-item')

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ){
                return User.findById( args.id );
            }
        },
        users: {
            type: new GraphQLList( UserType ),
            resolve( parent, args ){
                return User.find({});
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ){
                return Product.findById( args.id );
            }
        },
        products: {
            type: new GraphQLList( ProductType ),
            resolve( parent, args ){
                return Product.find({});
            }
        },
        productsByCategory: {
            type: new GraphQLList( ProductType ),
            args: { category: { type: ProductEnumType } },
            resolve( parent, args ){
                return Product.find( args.category ).exec();
            }
        },
        productsByStatus: {
            type: new GraphQLList( ProductType ),
            args: { status: { type: StatusEnumType } },
            resolve( parent, args ){
                return Product.find( args.status ).exec();
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ){
                return Order.findById( args.id );
            }
        },
        orders: {
            type: new GraphQLList( OrderType ),
            resolve( parent, args ){
                return Order.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString )},
                email: { type: new GraphQLNonNull( GraphQLString )}
            },
            resolve( parent, args ){
                return User.create( args );
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )},
                input: { type: UserInputType }
            },
            resolve( parent, args ){
                return User.findByIdAndUpdate( args.id, args.input, { new: true });
            }
        },
        deleteUser: {
            type: GraphQLID,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )}
            },
            resolve( parent, args ){
                return User.findByIdAndRemove( args.id, ( err, result )=>{
                    if( err ) console.log("error:", err)
                    else if( result ) console.log("Successful deletion")
                }).then(() => {
                    return args.id
                })
            }
        },
        createProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString )},
                price: { type: new GraphQLNonNull( GraphQLFloat )},
                category: { type: ProductEnumType },
                description: { type: GraphQLString },
                status: { type: StatusEnumType },
                images: { type: new GraphQLList( new GraphQLNonNull( GraphQLString ) )}
            },
            resolve(parent, args) {
                return Product.create( args );
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )},
                input: { type: ProductInputType }
            },
            resolve( parent, args ){
                return Product.findByIdAndUpdate( args.id, args.input, { new: true });
            }
        },
        deleteProduct: {
            type: GraphQLID,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )}
            },
            resolve( parent, args ){
                return Product.findByIdAndRemove( args.id, ( err, result )=>{
                    if( err ) console.log("error:", err)
                    else if( result ) console.log("Successful deletion")
                }).then(() => {
                    return args.id
                })
            }
        },
        createOrder: {
            type: OrderType,
            args: {
                user_id: { type: new GraphQLNonNull( GraphQLID )},
                items: {
                    type: new GraphQLList( new GraphQLNonNull( CartItemInputType ))
                }
            },
            resolve(parent, args) {
                return Order.create( args );
            }
        },
        updateOrder: {
            type: OrderType,
            args: {
                id: { type: GraphQLID },
                input: {
                    type: new GraphQLNonNull( OrderInputType )
                }
            },
            resolve( parent, args ){
                return Order.findByIdAndUpdate( args.id, args.input, { new: true });
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
