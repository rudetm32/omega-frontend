"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import useSWR from "swr";
import { fetchUsers, addUser } from "../services/UserServices";

interface User {
  id?: number; // Cambiado de long a number
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  telephone: string;
  rol:string;
  company: {id:number; name:string;};
  password: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: users, mutate } = useSWR('/users', fetchUsers);

  const handleAddUser = async (user: User) => {
    
    const userData: User = user  
    await addUser(userData);
    mutate((currentUsers: User[]) => [...(currentUsers || []), userData], false); // Optimistic update
  };
  
  return (
    <UserContext.Provider value={{ users: users || [], addUser: handleAddUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
