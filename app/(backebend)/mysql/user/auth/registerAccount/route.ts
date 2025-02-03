
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import { promises as fs } from 'fs';

// Disable default body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

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

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : File = response;

        console.log("data: ", data);

        // const buffer = Buffer.from(data.account.password);
        // const hashedPassword = buffer.toString("base64");

        // const connection = await mysql.createConnection(DBConfig);
        // await connection.beginTransaction();

        // // insert user data
        // const [resultUser] : any = await connection.execute('INSERT INTO user (name, email, phoneNumber, password, accountStatus, loginStatus) VALUES (?, ?, ?, ?, ?, ?)', [data.account.username, data.account.email, data.account.contactNumber, hashedPassword, true, true]);

        // const userID = resultUser.insertId;

        // // insert vehicle data
        // const [resultVehicle] : any =  await connection.execute('INSERT INTO vehicle (userID, plateNumber, model, color) VALUES (?, ?, ?, ?)', [userID, data.vehicle.plateNumber, data.vehicle.vehicleType, data.vehicle.color]);
        // const vehicleID = resultVehicle.insertId;

        // // insert policy data
        // if (data.policy.hasPolicy) {
        //     await connection.execute('INSERT INTO insurancepolicy (vehicleID, policyNo, policyholderName, icNumber, policyFile) VALUES (?, ?, ?, ?, ?)', [vehicleID, data.policy.policyNumber, data.policy.policyHolderName, data.policy.icNumber, data.policy.uploadFile]);
        // }

        // await connection.execute('UPDATE user SET loginStatus = ? WHERE id = ?', [true, userID]);

        // await connection.commit();
        // connection.end();

        // localStorage.setItem("userID", userID.toString());

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