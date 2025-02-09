import axios from "axios";

// system admin
export const getAllSystemAdmin = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/systemAdmin/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getSystemAdminInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/systemAdmin/getInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addSystemAdmin = async (name: string, password: string) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/systemAdmin/add', { name, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateSystemAdmin = async (id: any, name: string, password: string) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/systemAdmin/update', { id, name, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteSystemAdmin = async (id: number) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/systemAdmin/delete', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}