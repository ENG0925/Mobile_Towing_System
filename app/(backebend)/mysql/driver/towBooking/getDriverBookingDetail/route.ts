import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface TowBooking {
    bookingNo: number;
    userID: number;
    vehicleID: number;
    driverID: number;
    bookingDate: string;
    serviceLocation: string;
    towingLocation: string;
    distance: number;
    status: string;
    estimatedCost: number;
    isWaive: boolean;
    isCompleted: boolean;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const { bookingNo } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        const [queryTowBooking] = await connection.execute('SELECT * FROM towbooking WHERE bookingNo = ?', [bookingNo]);
        const towbooking = queryTowBooking as TowBooking[];

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