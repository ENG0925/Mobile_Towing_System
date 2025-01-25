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
        policyNo: string;
        icNumber: string;
        policyHolderName: string;
        uploadFile: File;
    };
    vehicle: {
        color: string;
        plateNumber: string;
        model: string;
    };
}

export const checkUsernameAndEmail = async (username: string, email: string) => {
    try {
        await axios.post('/mysql/user/auth/checkUsernameAndEmail', { username, email });
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAccountDetail = async (id: number) => {
    try {
        await axios.post('/mysql/user/auth/getAccountDetail', { id });
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const login = async (username: string, password: string) => {
    try {
        await axios.post('/mysql/user/auth/login', { username, password });
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const registerAccount = async (data: ReqRegisterData) => {
    try {
        await axios.post('/mysql/user/auth/registerAccount', { data });
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updatePassword = async (newPassword: string) => {
    try {
        await axios.post('/mysql/user/auth/updatePassword', { newPassword });
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateProfile = async (userName: string, email: string, contact: number) => {
    try {
        await axios.post('/mysql/user/auth/updateProfile', { userName, email, contact });
    } catch (error) {
        console.error("Error: ", error);
    }
}