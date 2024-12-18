export const BASE_URL = "http://localhost:8080";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const fetchData = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorizclearation: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${errorText}`);
  }

  return await response.json();
};
