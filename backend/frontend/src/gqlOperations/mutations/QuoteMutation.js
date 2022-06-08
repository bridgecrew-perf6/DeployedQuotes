import { gql } from "@apollo/client";

const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    quote: createQuote(name: $name)
  }
`;

export { CREATE_QUOTE };
