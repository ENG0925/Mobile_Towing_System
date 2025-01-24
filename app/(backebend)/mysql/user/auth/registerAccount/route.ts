
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface ReqData {
    account: Account;
    policy: Policy;
    vehicle: Vehicle;
}

interface Account {
    confirmPassword: string;
    contactNumber: string;
    email: string;
    password: string;
    username: string;
}

interface Policy {
    hasPolicy: boolean;
    policyNo: string;
    icNumber: string;
    policyHolderName: string;
    uploadFile: File;
}

interface Vehicle {
    color: string;
    plateNumber: string;
    model: string;
}

interface UserID {
    id: number;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : ReqData= response.data;

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert user data
        const [resultUser] : any = await connection.execute('INSERT INTO user (name, email, phoneNumber, password, accountStatus, loginStatus) VALUES (?, ?, ?, ?, ?, ?)', [data.account.username, data.account.email, data.account.contactNumber, data.account.password, true, true]);

        const userID = resultUser.insertId;

        // insert vehicle data
        const [resultVehicle] : any =  await connection.execute('INSERT INTO vehicle (userID, plateNumber, model, color) VALUES (?, ?, ?, ?)', [userID, data.vehicle.plateNumber, data.vehicle.model, data.vehicle.color]);
        const vehicleID = resultVehicle.insertId;

        // insert policy data
        if (data.policy.hasPolicy) {
            await connection.execute('INSERT INTO insurancepolicy (vehicleID, policyNo, policyholderName, icNumber, policyFile) VALUES (?, ?, ?, ?, ?)', [vehicleID, data.policy.policyNo, data.policy.policyHolderName, data.policy.icNumber, data.policy.uploadFile]);
        }

        await connection.commit();
        connection.end();

        localStorage.setItem("userID", userID.toString());

        return NextResponse.json({ 
            success: true, 
            message: 'Account created successfully' 
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}