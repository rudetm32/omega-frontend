const BASE_URL = "http://localhost:8080";


export const fetchUsers = async () => {

    const response = await fetch(`${BASE_URL}/user`);

    if (!response.ok) throw new Error("error fetching Users")
        return await response.json();
};

export const addUser = async (user: any) => {
    const response = await fetch(`${BASE_URL}/user/create`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    console.log("respuesta de la peticion desde servicies: " + response)
    if (!response.ok) throw new Error("error adding user")
        return await response.json();
}