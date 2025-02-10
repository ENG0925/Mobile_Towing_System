import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface BookingDetail {
    bookingNo: string;
    customerName: string;
    contactNumber: string;
    vehicleType: string;
    plateNumber: string;
    serviceLocation: string;
    towingLocation: string;
    status: string;
    bookingDate: string;
  }

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const { bookingNo } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        const [queryTowBooking] = await connection.execute(`
            SELECT 
                tb.bookingNo AS bookingNo,
                u.name AS customerName,
                u.phoneNumber AS contactNumber,
                v.model AS vehicleType,
                v.plateNumber AS plateNumber,
                tb.serviceLocation,
                tb.towingLocation,
                tb.status,
                CAST(tb.bookingDate AS CHAR) AS bookingDate
            FROM towbooking tb
            JOIN user u ON tb.userID = u.id
            JOIN vehicle v ON tb.vehicleID = v.id
            WHERE tb.bookingNo = ?
            `, [bookingNo]
        );
        const towbooking = queryTowBooking as BookingDetail[];
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Data fetched successfully',   
            data: towbooking[0],
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}