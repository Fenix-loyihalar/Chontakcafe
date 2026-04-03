import { API_URL } from "$env/static/private";

export const load = async () => {
    try {
        const res = await fetch(`${API_URL}/menu`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            console.error("API xatoligi:", await res.text());
            return { menuItems: [] }; // Xatolik bo'lsa bo'sh massiv qaytaramiz
        }

        const data = await res.json();
        return { menuItems: data };
    } catch (error) {
        console.error("Tarmoq xatoligi:", error);
        return { menuItems: [] };
    }
};