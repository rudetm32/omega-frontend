import { BASE_URL, fetchData } from './apiService';

export const fetchCompany = async () => {
  const data = await fetchData(`${BASE_URL}/companies`);
  console.log("Contiene info de compañías: ", data);
  return data.content;
};

export const addCompany = async (company: any) => {
  const data = await fetchData(`${BASE_URL}/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  });
  return data;
};
