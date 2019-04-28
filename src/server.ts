const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const { GraphQLServer } = require('graphql-yoga');

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({
  port: 3000
}, () => console.log('Server is running on localhost:3000'));
