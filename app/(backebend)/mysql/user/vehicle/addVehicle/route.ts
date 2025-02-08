import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        
        console.log("FormData Entries:");
        formData.forEach((value, key) => console.log(key, value));

        const file = formData.get('pdf') as File;
        const vehicle = JSON.parse(formData.get('vehicle') as string || '{}');
        const policy = JSON.parse(formData.get('policy') as string || '{}');
        const userID = formData.get('userID') as string || null;

        if (!userID || !vehicle.plateNumber || !vehicle.vehicleType || !vehicle.color) {
            throw new Error("Missing required fields");
        }

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert vehicle data
        const [resultVehicle]: any = await connection.execute(
            'INSERT INTO vehicle (userID, plateNumber, model, color, isDeleted) VALUES (?, ?, ?, ?, FALSE)', 
            [userID, vehicle.plateNumber, vehicle.vehicleType, vehicle.color]
        );
        const vehicleID = resultVehicle.insertId;

        // insert policy data
        if (policy.hasInsurancePolicy) {
            const [resultInsurance]: any = await connection.execute(
                'INSERT INTO insurancepolicy (vehicleID, policyNo, policyholderName, icNumber) VALUES (?, ?, ?, ?)', 
                [vehicleID, policy.policyNumber, policy.policyHolderName, policy.icNumber]
            );
            const insuranceID = resultInsurance.insertId; 
            const policyFileName = `${insuranceID}.pdf`;

            if (file) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const publicDir = path.join(process.cwd(), 'public', 'policyFile');
                const filePath = path.join(publicDir, policyFileName);

                await writeFile(filePath, buffer);
                await connection.execute('UPDATE insurancepolicy SET policyFile = ? WHERE id = ?', [policyFileName, insuranceID]);
            }
        }

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Add vehicle successfully', 
        });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong'
        });
    }
}
