import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (
    firstName: string,
    lastName: string | undefined,
    email: string,
    password: string
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate restore session
    setTimeout(() => setLoading(false), 500);
  }, []);

  const login = (email: string) => {
    setUser({
      id: "1",
      firstName: "Prachi",
      email,
    });
  };

  const register = (
    firstName: string,
    lastName: string | undefined,
    email: string
  ) => {
    setUser({
      id: "1",
      firstName,
      lastName,
      email,
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
