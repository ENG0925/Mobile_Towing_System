import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userID, plateNumber, model, color } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        await connection.execute(
            'INSERT INTO vehicle (userID, plateNumber, model, color, isDeleted) VALUES (?, ?, ?, ?, false)', 
            [userID, plateNumber, model, color]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Vehicle successfully added.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
