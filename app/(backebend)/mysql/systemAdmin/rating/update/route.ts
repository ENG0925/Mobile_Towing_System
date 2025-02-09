import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const { id, userID, comment, rating } = await req.json();


        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        await connection.execute(
            'UPDATE feedback SET comment = ?, rating = ?, userID = ? WHERE id = ?', 
            [comment, rating, userID, id]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Feedback updated successfully.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
