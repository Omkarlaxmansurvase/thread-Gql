import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register(
    $firstName: String!
    $lastName: String
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export const ME_QUERY = gql`
  query Me {
    me {
      id
      firstName
      email
    }
  }
`;