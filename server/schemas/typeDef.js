// gql is a tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql `
        type User{
            _id: ID
            username:  String
            email: String
            password: String
        }

        type Query {
            users: [User]
            user(_id: ID!): User
        }

`;

// export the typeDefs
module.exports = typeDefs;