
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { id } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        const [query] = await connection.execute(`
            SELECT 
              v.*, 
              v.model AS vehicle,
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
              AND
              v.isDeleted IS FALSE
            `, 
            [id]
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