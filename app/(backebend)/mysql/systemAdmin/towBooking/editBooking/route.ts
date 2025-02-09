import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const { 
            bookingNo, 
            userID, 
            vehicleID, 
            driverID, 
            bookingDate, 
            serviceLocation, 
            towingLocation, 
            distance, 
            status, 
            estimatedCost, 
            isWaive 
        } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        await connection.execute(
            `UPDATE towBooking 
             SET userID = ?, vehicleID = ?, driverID = ?, bookingDate = ?, 
                 serviceLocation = ?, towingLocation = ?, distance = ?, 
                 status = ?, estimatedCost = ?, isWaive = ? 
             WHERE bookingNo = ?`, 
            [userID, vehicleID, driverID, bookingDate, serviceLocation, towingLocation, distance, status, estimatedCost, isWaive, bookingNo]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Tow booking updated successfully.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
