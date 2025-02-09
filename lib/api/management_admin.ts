import axios from "axios";

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/mysql/managementAdmin/auth/login', { username, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}