import {gql} from "graphql-tag";

export default gql`
  type Thread {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    getAllThreads: [Thread!]!
    getThread(id: ID!): Thread
  }

  type Mutation {
    createThread(content: String!): Thread!
    deleteThread(id: ID!): Boolean!
  }
`;
