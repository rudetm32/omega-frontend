const BASE_URL = "http://localhost:8080";

const getToken = () => {
    if(typeof window !== "undefined") {
        return localStorage.getItem("authToken");
    }
    return null;
};

export const fetchUsers = async () => {

    const token = getToken();
    if(!token) {
    throw new Error("Token not found")
    }
    const response = await fetch(`${BASE_URL}/users`,{
        headers: {
            "Authorization":`Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al obtener a los usuarios")
        return await response.json();
};

export const addUser = async (user: any) => {
    const token = getToken();
    if(!token) {
        throw new Error("Token not found")
        }
    const response = await fetch(`${BASE_URL}/users`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
    console.log("respuesta de la peticion desde servicies: ", response)
    if (!response.ok) throw new Error("Error al agregar usuarios")
        return await response.json();
}