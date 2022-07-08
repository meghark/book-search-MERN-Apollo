import { gql } from '@apollo/client';

// export query for singleuser.
export const QUERY_SINGLEUSER = gql`
    query User($id: ID!) {
        user(_id: $id) {
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