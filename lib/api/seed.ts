import axios from "axios";

export const insertSuperAdmin = async () => {
    try {
        await axios.post('/mysql/seed/insertSuperAdmin');
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const testingConnectionDB = async () => {
    try {
        const response = await axios.get('/mysql/seed/testingConnectionDB');
        return response;
    } catch (error) {
        console.error("Error: ", error);
    }
}