const BASE_URL = "http://localhost:8080";

// Función para obtener el token (ajusta esto según cómo almacenes el token)
const getToken = () => {
    if(typeof window !== "undefined") {
        return localStorage.getItem("authToken");
    }
    return null;
};

export const fetchCompany = async () => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/companies`, {
        headers: {
            "Authorization": `Bearer ${token}`, // Incluye el token en los encabezados
        },
    });

    if (!response.ok) throw new Error("error fetching companies");
    const data = await response.json();

    console.log("Contiene info de compañias: ", data);
    return data.content;
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
