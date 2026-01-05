export interface LoginResponse {
  login: {
    token: string;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}
// graphql/types.ts

export interface RegisterResponse {
  register: {
    id: string;
  };
}

export interface RegisterVariables {
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
}
export interface Thread {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
  };
}

export interface GetAllThreadsResponse {
  getAllThreads: Thread[];
}

export interface CreateThreadResponse {
  createThread: Thread;
}

export interface CreateThreadVariables {
  content: string;
}

export interface DeleteThreadVariables {
  id: string;
}
export interface MeResponse {
  me: {
    id: string;
    firstName: string;
    email: string;
  };
}
