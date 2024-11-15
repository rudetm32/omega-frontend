const BASE_URL = "http://localhost:8080";

// Función para obtener el token (ajusta esto según cómo almacenes el token)
const getToken = () => {
    return localStorage.getItem("token"); // O de donde sea que obtengas el token
};

export const fetchCompany = async () => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/companies`, {
        headers: {
            "Authorization": `Bearer ${token}`, // Incluye el token en los encabezados
        },
    });

    if (!response.ok) throw new Error("error fetching companies");
    return await response.json();
};

export const addCompany = async (user: any) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/companies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Incluye el token en los encabezados
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("error adding company");
    return await response.json();
};
