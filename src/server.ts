var express = require('express');
var graphqlHTTP = require('express-graphql');
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema, 
    rootValue: root,
    graphiql: true
}));

app.listen(3000);
console.log('Running a GraphQL API Server at localhost:3000/graphql');
