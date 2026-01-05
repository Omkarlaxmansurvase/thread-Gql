import {gql} from "graphql-tag";

export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
  }

  type AuthResponse {
    token: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String
      email: String!
      password: String!
    ): User!

    login(email: String!, password: String!): AuthResponse!
  }
`;
