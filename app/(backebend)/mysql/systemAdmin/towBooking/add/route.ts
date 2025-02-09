import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface ReqData {
    userID: number;
    vehicleID: number;
    driverID: number;
    bookingDate: string;
    towingLocation: string;
    serviceLocation: string;
    distance: number;
    estimatedCost: number;
    status: string;
    isWaive: any;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const response = await req.json();
        const data: ReqData = response.data;

        // Convert `isWaive` to boolean
        data.isWaive = data.isWaive === "true";

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // Insert booking
        const [resultBooking]: any = await connection.execute(
            `INSERT INTO towbooking 
                (userID, vehicleID, driverID, bookingDate, serviceLocation, towingLocation, distance, estimatedCost, isCompleted, status, isWaive) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, false, ?, ?)`, 
            [data.userID, data.vehicleID, data.driverID, data.bookingDate, data.serviceLocation, data.towingLocation, data.distance, data.estimatedCost, data.status, data.isWaive]
        );
        const bookingNo = resultBooking.insertId;

        // Handle payments if status is "payment"
        if (data.status === "payment") {
            await connection.execute(
                `INSERT INTO payment (bookingNo, amount, date, method) 
                 VALUES (?, ?, ?, ?)`, 
                [bookingNo, data.estimatedCost, data.bookingDate, 'admin payment']
            );

            await connection.execute(
                `UPDATE towbooking SET status = ?, isCompleted = true WHERE bookingNo = ?`, 
                ['booking complete', bookingNo]
            );
        }

        await connection.commit();
        connection.end();

        return NextResponse.json({ success: true, message: 'Booking successfully' });

    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ success: false, message: 'Something went wrong' });
    }
}
