
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface ReqData {
    bookingNo: number;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : ReqData= response.data;

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        // insert user data
        await connection.execute(
            'INSERT INTO payment (bookingNo, amount, date, method) VALUES (?, ?, ?, ?)', 
            [data.bookingNo, data.amount, data.paymentDate, data.paymentMethod]
        );

        await connection.execute(
            'UPDATE towbooking SET status = ? WHERE bookingNo = ?', 
            ['complete', data.bookingNo]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Payment successfully'
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}