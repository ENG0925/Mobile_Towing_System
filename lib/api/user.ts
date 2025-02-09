import axios from "axios";

interface ReqInsertTowBookingData {
    userID: number;
    vehicleID: number;
    bookingDate: string;
    towingLocation: string;
    serviceLocation: string;
    distance: number;
    estimateCost: number;
}

export const checkUsernameAndEmail = async (username: string, email: string) => {
    try {
        const response = await axios.post('/mysql/user/auth/checkUsernameAndEmail', { username, email });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAccountDetail = async (id: number) => {
    try {
        const response = await axios.post('/mysql/user/auth/getAccountDetail', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/mysql/user/auth/login', { username, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const logout = async (id: number) => {
    try {
        const response = await axios.post('/mysql/user/auth/logout', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const registerAccount = async (formData: any) => {
    try {
        const response = await fetch('/mysql/user/auth/registerAccount', {
            method: 'POST',
            body: formData,
        });
        return response.json();
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};


export const updatePassword = async (newPassword: string, id: number) => {
    try {
        const response = await axios.put('/mysql/user/auth/updatePassword', { newPassword, id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateProfile = async (userName: string, email: string, contact: number, id: number) => {
    try {
        const response = await axios.put('/mysql/user/auth/updateProfile', { userName, email, contact, id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}


// vehicle
export const getAllVehicle = async (id: number) => {
    try {
        const response = await axios.post('/mysql/user/vehicle/getAllVehicle', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addVehicle = async (data: any) => {
    try {
        const response = await fetch('/mysql/user/vehicle/addVehicle', {
            method: 'POST',
            body: data,
        });
        return response.json();
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

export const getVehicleInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/user/vehicle/getVehicleInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteVehicle = async (id: number) => {
    try {
        const response = await axios.put('/mysql/user/vehicle/deleteVehicle', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// tow booking
export const getAllTowBooking = async (userID: number) => {
    try {
        const response = await axios.post('/mysql/user/towBooking/getAllTowBooking', { userID });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getBookingInfo = async (bookingNo: number) => {
    try {
        const response = await axios.post('/mysql/user/towBooking/getBookingInfo', { bookingNo });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const insertBooking = async (data: ReqInsertTowBookingData) => {
    try {
        const response = await axios.post('/mysql/user/towBooking/insertBooking', { data });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const payment = async (data: any) => {
    try {
        const response = await axios.post('/mysql/user/towBooking/payment', { data });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}
// feedback
export const getAllFeedback = async (userID: number) => {
    try {
        const response = await axios.post('/mysql/user/feedback/getAllFeedback', { userID });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addFeedback = async (userID: number, comment: string, rating: number) => {
    try {
        const response = await axios.post('/mysql/user/feedback/addFeedback', { userID, comment, rating });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const likeFeedback = async (userID: number, feedbackID: number, isLike: boolean) => {
    try {
        const response = await axios.post('/mysql/user/feedback/likeFeedback', { userID, feedbackID, isLike });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}