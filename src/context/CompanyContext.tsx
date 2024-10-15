"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";
import { addCompany, fetchCompany } from "../services/CompanyServices";

interface Company {
  id: number; // Cambiado a number
  name: string;
  email: string;
  telephone: string;
  nameContact: string;
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
  const { data: companies, mutate } = useSWR('/company', fetchCompany);

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
    throw new Error('useCompanyContext must be used within a CompanyProvider'); // Cambiado mensaje
  }
  return context;
};
