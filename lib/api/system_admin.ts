import axios from "axios";

export const checkUsernameAndEmail = async (username: string, email: string) => {
    try {
        const response = await axios.post('/mysql/user/auth/checkUsernameAndEmail', { username, email });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}