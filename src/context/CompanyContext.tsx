"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";
import { addCompany, fetchCompany } from "../services/CompanyServices";
import { useUserContext } from "@/context/UserContext";

interface Company {
  id: number; 
  name: string;
  email: string;
  telephone: string;
  contactName: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface CompanyContextType {
  companies: Company[];
  addCompany: (company: Company) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useUserContext()
  const { data: companies, mutate } = useSWR(isAuthenticated ? '/companies' : null, fetchCompany);

  const handleAddCompany = async (company: Company) => {
    await addCompany(company);
    mutate((currentCompanies: Company[]) => [...(currentCompanies || []), company], false); // Optimistic update
  };

  return (
    <CompanyContext.Provider value={{ companies: companies || [], addCompany: handleAddCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyProvider'); 
  }
  return context;
};
