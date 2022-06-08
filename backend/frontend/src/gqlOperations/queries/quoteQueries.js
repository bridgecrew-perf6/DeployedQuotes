import { gql } from "@apollo/client";

const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      by {
        _id
        firstName
      }
      name
    }
  }
`;
export { GET_ALL_QUOTES };
