const express = require('express')
const { graphqlHTTP } = require('express-graphql')
// const depthLimit = require('graphql-depth-limit')
const { buildSchema } = require('graphql')
const { importSchema } = require('graphql-import')

const schema = buildSchema(importSchema('**/*.graphql'))
const resolvers = require('./src/resolvers');

const mongoose = require('mongoose')
const mongooseConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const app = express()
const port = 3000
app.use( '/', 
    graphqlHTTP({
        schema: schema,
        // validationRules: [depthLimit(2)],
        graphiql: true,
        rootValue: resolvers,
    })
)

async function start(){
    try{
        await mongoose.connect('mongodb+srv://elli:1q2w3e4r@cluster0.zerjs.mongodb.net/graphql', mongooseConnectOptions )
        app.listen(port, ()=>{
            console.log('GraphQL API server running at localhost: ' + port)
        })
    }catch( e ){
        console.log('mondb not connected');
        console.log(e)
    }
}

start()
