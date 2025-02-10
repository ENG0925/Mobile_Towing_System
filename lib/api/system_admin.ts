import axios from "axios";

interface ReqData {
    userID: number;
    vehicleID: number;
    driverID: number;
    bookingDate: string;
    towingLocation: string;
    serviceLocation: string;
    distance: number;
    estimateCost: number;
    status: string;
    isWaive: boolean;
}

//auth
export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/auth/login', { username, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const logout = async (id: any) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/auth/logout', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

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

// menagement admin
export const getAllManagementAdmin = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/managementAdmin/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getManagementAdminInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/managementAdmin/getInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addManagementAdmin = async (name: string, department: string, password: string) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/managementAdmin/add', { name, department, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateManagementAdmin = async (id: any, name: string, department: string, password: string) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/managementAdmin/update', { id, name, department, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteManagementAdmin = async (id: number) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/managementAdmin/delete', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// user
export const getAllUser = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/user/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getUserInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/user/getInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addUser = async (name: string, email: string, phoneNumber: number, password: string) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/user/add', { name, email, phoneNumber, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateUser = async (id: any, name: string, email: string, phoneNumber: number, password: string) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/user/update', { id, name, email, phoneNumber, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/user/delete', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// driver
export const getAllDriver = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/driver/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getDriverInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/driver/getInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addDriver = async (name: string, phoneNumber: number, password: string) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/driver/add', { name, phoneNumber, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateDriver = async (id: any, name: string, phoneNumber: number, password: string) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/driver/update', { id, name, phoneNumber, password });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteDriver = async (id: number) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/driver/delete', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// booking
export const getAllBooking = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/towBooking/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getBookingInfo = async (bookingNo: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/towBooking/getInfo', { bookingNo });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addBooking = async (data: ReqData) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/towBooking/add', { data });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateBooking = async (data: any) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/towBooking/update', { data });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllUserBooking = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/towBooking/getAllUser');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllVehicleBooking = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/towBooking/getAllVehicle');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getAllDriverBooking = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/towBooking/getAllDriver');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// vehicle
export const getAllVehicle = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/vehicle/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getVehicleInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/vehicle/getInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addVehicle = async (userID: number, plateNumber: string, model: string, color: string) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/vehicle/add', { userID, plateNumber, model, color });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateVehicle = async (id: any, userID: number, plateNumber: string, model: string, color: string) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/vehicle/update', { id, userID, plateNumber, model, color });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteVehicle = async (id: number) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/vehicle/delete', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// feedback
export const getAllFeedback = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/rating/getAllInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const getFeedbackInfo = async (id: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/rating/getInfo', { id });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const addFeedback = async (userID: number, comment: string, rating: number) => {
    try {
        const response = await axios.post('/mysql/systemAdmin/rating/add', { userID, comment, rating });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const updateFeedback = async (id: any, userID: number, comment: string, rating: number) => {
    try {
        const response = await axios.put('/mysql/systemAdmin/rating/update', { id, userID, comment, rating });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const deleteFeedback = async (id: number) => {
    try {
        const response = await axios.delete('/mysql/systemAdmin/rating/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}

// dashboard
export const getDashboardInfo = async () => {
    try {
        const response = await axios.get('/mysql/systemAdmin/dashboard/getDashboardInfo');
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    }
}