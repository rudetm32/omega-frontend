"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useSWR from "swr";
import { fetchUsers } from "../services/UserServices";
import { useRouter } from "next/navigation";

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  telephone: string;
  rol: string;
  company: { id: number; name: string };
  password: string;
}

interface UserContextType {
  users: User[];
  //  addUser: (user: User) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
}
const BASE_URL = "http://localhost:8080";
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = typeof window !== "undefined" ? useRouter() : null;
  const { data: users = [], mutate } = useSWR(
    isAuthenticated ? "/users" : null,
    fetchUsers
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("authToken");
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  // const handleAddUser = async (user: User) => {
  //   await addUser(user);
  //   mutate((currentUsers: User[]) => [...(currentUsers || []), user], false);
  // };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Error en la autenticación");

      const data = await response.json();
      const jwtToken = data.jwtToken;

      setToken(jwtToken);
      localStorage.setItem("authToken", jwtToken);
      setIsAuthenticated(true);
      router?.push("/dashboard");
    } catch (error) {
      setToken(null);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    router?.push("/login");
  };

  return (
    <UserContext.Provider
      value={{
        users: users || [], // Se pasa la lista de usuarios solo si está disponible
        //        addUser: handleAddUser,
        login,
        logout,
        isAuthenticated,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
