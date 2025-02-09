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
    bookingNo: number;
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {

        const response = await req.json();
        const data: ReqData = response.data;

        // Convert `isWaive` to boolean
        data.isWaive = data.isWaive === "true";

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryTowBooking] = await connection.execute("SELECT * FROM payment WHERE bookingNo = ?", [data.bookingNo]);
        const towBooking = queryTowBooking as any[];

        if (towBooking.length > 0 && data.status !== 'payment') {
            console.log('delete payment');
            await connection.execute("DELETE FROM payment WHERE bookingNo = ?", [data.bookingNo]);
        }

        if (data.status === 'payment') {
            await connection.execute(
                `INSERT INTO payment (bookingNo, amount, date, method) 
                 VALUES (?, ?, ?, ?)`, 
                [data.bookingNo, data.estimatedCost, data.bookingDate, 'admin payment']
            );
        }

        await connection.execute(
            `UPDATE towBooking 
             SET userID = ?, vehicleID = ?, driverID = ?, bookingDate = ?, 
                 serviceLocation = ?, towingLocation = ?, distance = ?, 
                 status = ?, estimatedCost = ?, isWaive = ? 
             WHERE bookingNo = ?`, 
            [data.userID, data.vehicleID, data.driverID, data.bookingDate, data.serviceLocation, data.towingLocation, data.distance, data.status, data.estimatedCost, data.isWaive, data.bookingNo]
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
