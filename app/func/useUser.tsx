import { useState } from "react";
import type { UserProps } from "~/type";

export const useUser = () => {
    const [user, setUser] = useState<UserProps | null>(null);

    const fetchUserData = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("userData", JSON.stringify(data));
                setUser(data);
            } else {
                console.error("Gagal mengambil data pengguna.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return { user, fetchUserData };
}