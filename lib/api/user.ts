import axios from "axios";

interface ReqRegisterData {
    account: {
        confirmPassword: string;
        contactNumber: string;
        email: string;
        password: string;
        username: string;
    };
    policy: {
        hasPolicy: boolean;
        policyNumber: string;
        icNumber: string;
        policyHolderName: string;
        
    };
    vehicle: {
        color: string;
        plateNumber: string;
        vehicleType: string;
    };
    uploadFile: File | null;
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

export const registerAccount = async (data: ReqRegisterData) => {
    try {
        const response = await axios.post('/mysql/user/auth/registerAccount', { data });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

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
export const getAllVehicle = async (userID: number) => {
    try {
        const response = await axios.post('/mysql/user/vehicle/getAllVehicle', { userID });
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
