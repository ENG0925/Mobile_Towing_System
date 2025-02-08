
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';

interface ReqData {
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

export async function POST (request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('pdf') as File;
        const vehicle = formData.get('vehicle') as any;
        const policy = formData.get('policy') as any;
        const account = formData.get('account') as any;

        const data: ReqData = {
            account: JSON.parse(account),
            policy: JSON.parse(policy),
            vehicle: JSON.parse(vehicle),
            uploadFile: file
        };
        
            
        const buffer = Buffer.from(data.account.password);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert user data
        const [resultUser] : any = await connection.execute('INSERT INTO user (name, email, phoneNumber, password, accountStatus, loginStatus) VALUES (?, ?, ?, ?, ?, ?)', [data.account.username, data.account.email, data.account.contactNumber, hashedPassword, true, true]);

        const userID = resultUser.insertId;

        // insert vehicle data
        const [resultVehicle] : any =  await connection.execute('INSERT INTO vehicle (userID, plateNumber, model, color, isDeleted) VALUES (?, ?, ?, ?, FALSE)', [userID, data.vehicle.plateNumber, data.vehicle.vehicleType, data.vehicle.color]);
        const vehicleID = resultVehicle.insertId;

        // insert policy data
        if (data.policy.hasPolicy) {
            const [resultInsurance] : any =  await connection.execute('INSERT INTO insurancepolicy (vehicleID, policyNo, policyholderName, icNumber) VALUES (?, ?, ?, ?)', [vehicleID, data.policy.policyNumber, data.policy.policyHolderName, data.policy.icNumber]);
            const insuranceID = resultInsurance.insertId; 
            const policyFileName = insuranceID.toString() + '.pdf';

            // upload file to public directory
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes); 
            
            const publicDir = path.join(process.cwd(), 'public', 'policyFile');
            const filePath = path.join(publicDir, policyFileName);
        
            await writeFile(filePath, buffer);

            await connection.execute('UPDATE insurancepolicy SET policyFile = ? WHERE id = ?', [policyFileName, insuranceID]);
        }

        await connection.execute('UPDATE user SET loginStatus = ? WHERE id = ?', [true, userID]);

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Register successfully',
            id: userID
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}