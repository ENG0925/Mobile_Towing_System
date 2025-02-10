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

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const driverID = Number(localStorage.getItem('driverID'));

        const connection = await mysql.createConnection(DBConfig);

        // Single query with JOIN to fetch required data
        const [rows] = await connection.execute(`
            SELECT 
                tb.bookingNo AS id,
                u.name AS customerName,
                v.model AS vehicleType,
                v.plateNumber AS plateNumber,
                tb.serviceLocation,
                tb.towingLocation,
                tb.status,
                tb.bookingDate
            FROM towbooking tb
            JOIN user u ON tb.userID = u.id
            JOIN vehicle v ON tb.vehicleID = v.id
            WHERE tb.driverID = ?
            `, [driverID]
        );

        connection.end();

        // Map the query result to match the Response interface
        const responseData: Response[] = (rows as any[]).map(row => ({
            id: row.id,
            customerName: row.customerName,
            vehicleType: row.vehicleType,
            plateNumber: row.plateNumber,
            serviceLocation: row.serviceLocation,
            towingLocation: row.towingLocation,
            status: row.status,
            bookingDate: row.bookingDate,
        }));

        console.log('Data fetched successfully', rows);
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
