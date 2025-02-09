import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const { id, userID, plateNumber, model, color } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        await connection.execute(
            'UPDATE vehicle SET userID = ?, plateNumber = ?, model = ?, color = ? WHERE id = ?', 
            [userID, plateNumber, model, color, id]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Vehicle updated successfully.' 
        });
    } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
