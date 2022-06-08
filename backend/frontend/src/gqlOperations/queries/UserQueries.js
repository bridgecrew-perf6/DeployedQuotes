import { gql } from "@apollo/client";
const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      firstName
      lastName
      email
    }
  }
`;

const GET_MY_PROFILE = gql`
  query getMyProfile {
    userProfile: myProfile {
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    userProfile: user(_id: $userId) {
      _id
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;

export { GET_ALL_USERS, GET_MY_PROFILE, GET_USER_BY_ID };
