
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userID } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        
        const [queryTowBooking] = await connection.execute(`
            SELECT 
                towbooking.bookingNo,
                CAST(towbooking.bookingDate AS CHAR) AS bookingDate,
                towbooking.status,
                CAST(towbooking.estimatedCost AS CHAR) AS estimatedCost,
                vehicle.model
            FROM 
                towbooking 
            LEFT JOIN
                vehicle ON towbooking.vehicleID = vehicle.id
            LEFT JOIN
                payment ON towbooking.bookingNo = payment.bookingNo
            WHERE 
                towbooking.userID = ?
            GROUP BY 
                towbooking.bookingNo, towbooking.bookingDate, towbooking.status, 
                towbooking.estimatedCost, vehicle.model;
            `, 
            [userID]
        );

        const towBooking = queryTowBooking as [];

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: "Tow booking retrieved successfully",
            data: towBooking
        });
        
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: err
        });
    }
}