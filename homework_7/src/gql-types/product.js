const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ProductEnumType = new GraphQLEnumType({
    name: 'ProductEnum',
    values: {
        KITCHEN:    { value: 'KITCHEN' },
        HOUSE:      { value: 'HOUSE' },
        HEALTH:     { value: 'HEALTH' },
        COMPUTER:   { value: 'COMPUTER' },
        SMARTPHONE: { value: 'SMARTPHONE' },
        TOOL:       { value: 'TOOL' },
        ACCESSORY:  { value: 'ACCESSORY' },
    },
});
const StatusEnumType = new GraphQLEnumType({
    name: 'StatusEnum',
    values: {
        SALE:       { value: 'SALE' },
        NO_STOCK:   { value: 'NO_STOCK' },
        NEW:        { value: 'NEW' },
    },
});

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: ()=>({
        id: { type: new GraphQLNonNull( GraphQLID )},
        name: { type: new GraphQLNonNull( GraphQLString )},
        price: { type: new GraphQLNonNull( GraphQLFloat )},
        category: { type: ProductEnumType },
        description: { type: GraphQLString },
        status: { type: StatusEnumType },
        images: { type: new GraphQLList( new GraphQLNonNull( GraphQLString ) )},
    })
})

const ProductInputType = new GraphQLInputObjectType({
    name: "ProductInput",
    fields: ()=>({
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: ProductEnumType },
        description: { type: GraphQLString },
        status: { type: StatusEnumType },
        images: { type: new GraphQLList( new GraphQLNonNull( GraphQLString ) )},
    })
})

module.exports = {
    ProductEnumType,
    StatusEnumType,
    ProductType,
    ProductInputType,
}
