
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

        const [query] = await connection.execute(`
            SELECT 
              v.*, 
              CASE 
                WHEN ip.id IS NOT NULL THEN TRUE 
                ELSE FALSE 
              END AS hasInsurancePolicy
            FROM 
              vehicle v
            LEFT JOIN 
              insurancepolicy ip 
            ON 
              v.id = ip.vehicleID
            WHERE 
              v.userID = ?
            `, 
            [userID]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: "Vehicle retrieved successfully",
            data: query
        });
        
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong'
        });
    }
}