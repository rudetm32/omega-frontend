import { BASE_URL, fetchData } from './apiService';

export const fetchUsers = async () => {
  const data = await fetchData(`${BASE_URL}/users`);
  console.log("Contiene info de usuarios: ", data);
  return data.content;
};

export const addUser = async (user: any) => {
  const data = await fetchData(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return data;
};
