import { gql } from '@apollo/client';

// Login user and return a token for further calls.
export const LOGIN_USER = gql`
    mutation login($email: String!,  $password: String!) {
        login(email: $email, password: $password) {
        token
        user{
            _id,
            username
          } 
        }
    }
  
`;

// Add a user and return token for further requests.
export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user{
            _id
            username
        }
      }
    }
`;

// Save the selected book to usetrs document.
export const SAVE_BOOK = gql `
    mutation saveBook( $input: BookInput) {
        saveBook( input: $input) {
           
                _id
                username
                email
                password,
                savedBooks {
                    authors,
                    bookId
                }
              
      }
    }
`;

// Remove book from users document.
export const REMOVE_BOOK = gql `
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
      
                _id
                username
                email
                password,
                savedBooks {
                    authors,
                    bookId
                }
              
      }
    }
`;