import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Response {
    id: string;
    customerName: string;
    vehicleType: string;
    plateNumber: string;
    serviceLocation: string;
    towingLocation: string;
    status: string;
    bookingDate: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { driverID } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        // Fetch today's bookings sorted by bookingNo (biggest to smallest)
        const [rows] = await connection.execute(`
            SELECT 
                tb.bookingNo AS id,
                u.name AS customerName,
                v.model AS vehicleType,
                v.plateNumber AS plateNumber,
                tb.serviceLocation,
                tb.towingLocation,
                tb.status,
                CAST(tb.bookingDate AS CHAR) AS bookingDate
            FROM towbooking tb
            JOIN user u ON tb.userID = u.id
            JOIN vehicle v ON tb.vehicleID = v.id
            WHERE tb.driverID = ? 
            AND DATE(tb.bookingDate) = CURDATE()  -- Filter for today's bookings
            ORDER BY tb.bookingNo DESC  -- Sort from highest to lowest bookingNo
        `, [driverID]);

        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Data fetched successfully',   
            data: rows,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
