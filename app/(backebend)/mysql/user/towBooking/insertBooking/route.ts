
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface ReqData {
    userID: number;
    vehicleID: number;
    bookingDate: string;
    towingLocation: string;
    serviceLocation: string;
    distance: number;
    estimateCost: number;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : ReqData= response.data;

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert user data
        await connection.execute(
            'INSERT INTO towbooking (userID, vehicleID, bookingDate, serviceLocation, towingLocation, distance, status, estimatedCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [data.userID, data.vehicleID, data.bookingDate, data.serviceLocation, data.towingLocation, data.distance, 'pending', data.estimateCost]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Booking successfully'
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}