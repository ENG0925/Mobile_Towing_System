
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Vehicle {
    id: number;
    userID: number;
    color: string;
    plateNumber: string;
    model: string;
}

interface InsurancePolicy {
    id: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userID } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        
        const [queryVehicle] = await connection.execute('SELECT * FROM vehicle WHERE userID = ?', [userID]);
        const vehicle = queryVehicle as Vehicle[];

        const [queryInsurancePolicy] = await connection.execute('SELECT id FROM insurancepolicy WHERE vehicleID = ?', [vehicle[0].id]);
        const insurancePolicy = queryInsurancePolicy as InsurancePolicy[];

        const hasInsurance = insurancePolicy.length > 0 ? true : false;

        const data = {
            id: vehicle[0].id,
            color: vehicle[0].color,
            plateNumber: vehicle[0].plateNumber,
            model: vehicle[0].model,
            hasInsurancePolicy: hasInsurance
        }

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: "Vehicle retrieved successfully",
            data: data
        });
        
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong'
        });
    }
}