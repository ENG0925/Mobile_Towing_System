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
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    accountStatus: boolean;
    loginStatus: boolean;
}

interface Vehicle {
    id: number;
    userID: number;
    plateNumber: string;
    model: string;
    color: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const { bookingNo } = await req.json();
        
        const connection = await mysql.createConnection(DBConfig);

        const [queryTowBooking] = await connection.execute('SELECT * FROM towbooking WHERE bookingNo = ?', [bookingNo]);
        const towbooking = queryTowBooking as TowBooking[];

        const [queryUser] = await connection.execute('SELECT * FROM user WHERE id = ?', [towbooking[0].userID]);
        const user = queryUser as User[];

        const [queryVehicle] = await connection.execute('SELECT * FROM vehicle WHERE id = ?', [towbooking[0].vehicleID]);
        const vehicle = queryVehicle as Vehicle[];

        connection.end();
        
        const data = {
            towBooking: towbooking[0],
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                accountStatus: user[0].accountStatus,
                loginStatus: user[0].loginStatus,
            },
            vehicle: {
                id: vehicle[0].id,
                plateNumber: vehicle[0].plateNumber,
                model: vehicle[0].model,
                color: vehicle[0].color,
            },
        };

        return NextResponse.json({ 
            success: true, 
            message: 'Data fetched successfully',   
            data: data,
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}