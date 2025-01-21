
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
    icNumber: string;
    policyHolderName: string;
    uploadFile: File;
}

interface Vehicle {
    color: string;
    plateNumber: string;
    vehicleType: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : ReqData= response.data;

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert user data
        await connection.execute('INSERT INTO user (name, email, phoneNumber, password, accountStatus, loginStatus) VALUES (?, ?, ?, ?, ?, ?)', [data.account.username, data.account.email, data.account.contactNumber, data.account.password, true, true]);

        const [userID] = await connection.execute('SELECT id FROM user WHERE email = ?', [data.account.email]);

        // insert vehicle data
        await connection.execute('INSERT INTO vehicle (userID, plateNumber, model, color) VALUES (?, ?, ?, ?)', [data.vehicle.plateNumber, data.vehicle.vehicleType, data.vehicle.color]);

        // insert policy data
        if (data.policy.hasPolicy) {
            await connection.execute('INSERT INTO insurancepolicy (vehicleID, policyNo, policyholderName, icNumber, policyFile) VALUES (?, ?, ?, ?, ?)', [data.policy.icNumber, data.policy.policyHolderName, data.policy.uploadFile]);
        }



        await connection.commit();
        connection.end();

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}