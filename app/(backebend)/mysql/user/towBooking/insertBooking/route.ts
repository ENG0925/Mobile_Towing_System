
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface ReqData {
    vehicleID: number;
    bookingDate: string;
    towingLocation: string;
    serviceLocation: string;
    distance: string;
    estimateCost: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : ReqData= response.data;

        const userID = Number(localStorage.getItem('userID'));

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert user data
        await connection.execute('INSERT INTO towbooking (userID, vehicleID, bookingDate, serviceLocation, towingLocation, distance, status, estimatedCost) VALUES ()', [userID, data.vehicleID, data.bookingDate, data.serviceLocation, data.towingLocation, data.distance, 'in progress', data.estimateCost]);

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Booking added'
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}