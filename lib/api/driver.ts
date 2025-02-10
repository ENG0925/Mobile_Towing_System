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

export const logout = async (driverID: any) => {
    try {
        const response = await axios.put('/mysql/driver/auth/logout', { driverID });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const getAllDriverBooking = async (driverID: any) => {
    try {
        const response = await axios.post('/mysql/driver/towBooking/getDriverBooking', { driverID });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const getDriverBookingDetail = async (bookingNo: any) => {
    try {
        const response = await axios.post('/mysql/driver/towBooking/getDriverBookingDetail', { bookingNo });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const completeBooking = async (bookingNo: any) => {
    try {
        const response = await axios.put('/mysql/driver/towBooking/completeBooking', { bookingNo });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllBooking = async (driverID: any) => {
    try {
        const response = await axios.post('/mysql/driver/towBooking/getAllBooking', { driverID });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}