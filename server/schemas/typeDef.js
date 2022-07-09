// gql is a tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql `
        type User{
            _id: ID
            username:  String
            email: String
            password: String
            bookCount: Int
            savedBooks: [Book]
        }

        type Book{
            authors: [String]
            description: String
            bookId: String
            image: String
            link: String
            title: String
        }

        input BookInput{
            authors: [String]
            description: String
            bookId: String
            image: String
            title: String
        }
        
        type Auth {
            token: ID!
            user: User
          }
        
    
        type Query {
            me: User 
            users: [User]
            user(_id: ID!): User
        }

        type Mutation{
            login(email: String!, password: String!): Auth
            addUser(username: String!, email: String!, password: String!): Auth
            saveBook(input: BookInput): User
            removeBook(bookId: ID!): User
        }

`;

// export the typeDefs
module.exports = typeDefs;