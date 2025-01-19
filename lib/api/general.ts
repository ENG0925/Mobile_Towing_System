import axios from "axios";

export const getConfirmationInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/general/admin/getConfirmationInfo', { id });
        return response;
    } catch (error) {
        console.error("Error: ", error);
    }
}