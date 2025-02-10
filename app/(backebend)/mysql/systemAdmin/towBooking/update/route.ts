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
    bookingNo: number;
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {

        const response = await req.json();
        const data: ReqData = response.data;

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        await connection.execute(
            `UPDATE towBooking 
             SET userID = ?, vehicleID = ?, driverID = ?, bookingDate = ?, 
                 serviceLocation = ?, towingLocation = ?, distance = ?, 
                 status = ?, estimatedCost = ?
             WHERE bookingNo = ?`, 
            [data.userID, data.vehicleID, data.driverID, data.bookingDate, data.serviceLocation, data.towingLocation, data.distance, data.status, data.estimatedCost, data.bookingNo]
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
