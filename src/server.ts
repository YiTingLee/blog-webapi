const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
require('./db/db.ts');

// Construct a schema, using GraphQL schema language
const typeDefs = importSchema(__dirname + '/schemas/schema.graphql')

const user = {
  id: '1',
  name: 'eric',
  account: 'eric account',
  password: 'eric password',
  email: 'eric@email.com'
};
// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    getUser(preObj, args, context, info) {
      return user;
    },
    getUsers(preObj, args, context, info) {
      return [user];
    }
  },
  Mutation: {
    createUser(preObj, args, context, info) {
      return user;
    },
    updateUser(preObj, args, context, info) {
      return user;
    },
    deleteUser(preObj, args, context, info) {
      return user;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({
  port: 3000
}, () => console.log('Server is running on localhost:3000'));
