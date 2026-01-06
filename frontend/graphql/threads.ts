import { gql } from "@apollo/client";

export const GET_ALL_THREADS = gql`
  query GetAllThreads {
    getAllThreads {
      id
      content
      createdAt
      author {
        id
        firstName
      }
    }
  }
`;

export const CREATE_THREAD = gql`
  mutation CreateThread($content: String!) {
    createThread(content: $content) {
      id
      content
      createdAt
      author {
        id
        firstName
      }
    }
  }
`;

export const DELETE_THREAD = gql`
  mutation DeleteThread($id: ID!) {
    deleteThread(id: $id)
  }
`;
export const GET_THREAD = gql`
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      content
      createdAt
      author {
        id
        firstName
      }
    }
  }
`;
