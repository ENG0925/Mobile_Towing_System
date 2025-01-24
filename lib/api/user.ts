import axios from "axios";

export const insertSuperAdmin = async () => {
    try {
        await axios.post('/mysql/seed/insertSuperAdmin');
    } catch (error) {
        console.error("Error: ", error);
    }
}
