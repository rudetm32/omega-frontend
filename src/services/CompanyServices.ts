const BASE_URL = "http://localhost:8080";

export const fetchCompany = async () => {

    const response = await fetch(`${BASE_URL}/company`);

    if (!response.ok) throw new Error("error fetching companies")
        return await response.json();
};

export const addCompany = async (user: any) => {
    const response = await fetch(`${BASE_URL}/company/create`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("error adding company")
        return await response.json();
}