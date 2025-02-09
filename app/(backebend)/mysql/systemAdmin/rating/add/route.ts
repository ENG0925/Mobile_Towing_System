import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userID, comment, rating } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        await connection.execute(
            'INSERT INTO feedback (userID, comment, rating) VALUES (?, ?, ?)', 
            [userID, comment, rating]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Feedback successfully added.' 
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
