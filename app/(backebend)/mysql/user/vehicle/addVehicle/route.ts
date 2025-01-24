import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Vehicle {
    color: string;
    plateNumber: string;
    model: string;
}

interface insurancePolicy {
    policyNo: string;
    policyholderNmae: string;
    icNumber: number;
    policyFile: File;
}


interface Request {
    userID: number;
    vehicle: Vehicle;
    hasInsurancePolicy: boolean;
    insurancePolicy: insurancePolicy;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const respond = await req.json();
        const data: Request = respond.data;

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [resultVehicle] : any =  await connection.execute('INSERT INTO vehicle (userID, plateNumber, model, color) VALUES (?, ?, ?, ?)', [data.userID, data.vehicle.plateNumber, data.vehicle.model, data.vehicle.color]);
        const vehicleID = resultVehicle.insertId;

        if (data.hasInsurancePolicy) {
            await connection.execute('INSERT INTO insurancepolicy (vehicleID, policyNo, policyholderName, icNumber, policyFile) VALUES (?, ?, ?, ?, ?)', [vehicleID, data.insurancePolicy.policyNo, data.insurancePolicy.policyholderNmae, data.insurancePolicy.icNumber, data.insurancePolicy.policyFile]);
        }

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'User added successfully' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong'
        });
    }
}
