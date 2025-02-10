import axios from "axios";

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/mysql/driver/auth/login', {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const getAllDrivers = async () => {
    try {
        const response = await axios.get('/mysql/driver/towBooking/getDriverBooking');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
};