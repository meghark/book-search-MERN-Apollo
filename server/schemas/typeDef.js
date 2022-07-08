// gql is a tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql `
        type User{
            _id: ID
            username:  String
            email: String
            password: String
            savedBooks: [Book]
        }

        type Book{
            _id: ID
            authors: [String]
            description: String
            bookId: String
            image: String
            link: String
            title: String
        }

        type Query {
            users: [User]
            user(_id: ID!): User
        }

        type Mutation{
            login(email: String!, password: String!): User
            createUser(username: String!, email: String!, password: String!): User
        }

`;

// export the typeDefs
module.exports = typeDefs;