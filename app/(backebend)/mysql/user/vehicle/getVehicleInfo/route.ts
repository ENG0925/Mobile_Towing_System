
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
    vehicleID: number;
    policyholderName: string;
    policyNo: string;
    icNumber: number;
    policyFile: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { id } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        
        const [queryVehicle] = await connection.execute('SELECT * FROM vehicle WHERE id = ?', [id]);
        const vehicle = queryVehicle as Vehicle[];

        const [queryInsurancePolicy] = await connection.execute('SELECT * FROM insurancepolicy WHERE vehicleID = ?', [vehicle[0].id]);
        const insurancePolicy = queryInsurancePolicy as InsurancePolicy[];

        const hasInsurance = insurancePolicy.length > 0 ? true : false;

        const data = {
            vehicleType: vehicle[0].model,
            plateNumber: vehicle[0].plateNumber,
            color: vehicle[0].color,
            hasInsurance: hasInsurance,
            policyHolderName: hasInsurance ? insurancePolicy[0].policyholderName : null,
            policyNumber: hasInsurance ? insurancePolicy[0].policyNo : null,
            icNumber: hasInsurance ? insurancePolicy[0].icNumber : null,
            file: hasInsurance ? insurancePolicy[0].policyFile : null
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