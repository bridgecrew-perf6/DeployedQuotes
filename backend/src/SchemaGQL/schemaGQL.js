import { gql } from "apollo-server-express";

// Note -->
//     1. query --> on get request
//     2. mutation --> on post/delete/update request
//     3. resolver --> it will manage both query and mutation, will perform logical operations
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithNameId]
    userQuote(by: ID!): [Quote]
    myProfile : User
  }
  type QuoteWithNameId{
    name : String,
    by : UserName
  }
  type UserName{
    _id : String
    firstName : String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }

  type Token {
    token: String
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export { typeDefs };
