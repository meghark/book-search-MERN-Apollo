import { gql } from '@apollo/client';

// export query for logged in user.
// This query will also return the savedBook details.
export const GET_ME = gql`
  {
        me {
        _id
        username
        email
        savedBooks {
            authors
            bookId
            description
            image
            title
        }
      }
    }
`;