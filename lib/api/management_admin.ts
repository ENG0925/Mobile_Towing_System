import axios from "axios";

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/mysql/managementAdmin/auth/login', { username, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const logout = async (id: any) => {
    try {
        const response = await axios.post('/mysql/managementAdmin/auth/logout', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllUser = async () => {
    try {
        const response = await axios.get('/mysql/managementAdmin/user/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllBookings = async () => {
    try {
        const response = await axios.get('/mysql/managementAdmin/booking/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllDrivers = async () => {
    try {
        const response = await axios.get('/mysql/managementAdmin/driver/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllRating = async () => {
    try {
        const response = await axios.get('/mysql/managementAdmin/rating/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllVehicles = async () => {
    try {
        const response = await axios.get('/mysql/managementAdmin/vehicle/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getDashboardInfo = async () => {
    try {
        const response = await axios.get('/mysql/managementAdmin/dashboard/getDashboardInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getInsuranceInfo = async () => {
    try {
        const response = await axios.get(`/mysql/managementAdmin/insurance/getAllInfo`);
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
};