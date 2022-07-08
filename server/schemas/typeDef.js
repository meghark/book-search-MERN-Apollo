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
        
        type Auth {
            token: ID!
            user: User
          }

        type Query {
            users: [User]
            user(_id: ID!): User
        }

        type Mutation{
            login(email: String!, password: String!): Auth
            createUser(username: String!, email: String!, password: String!): Auth
        }

`;

// export the typeDefs
module.exports = typeDefs;