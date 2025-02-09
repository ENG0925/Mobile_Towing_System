import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        
        const { bookingNo } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();
        
        await connection.execute(
            'DELETE FROM towbooking WHERE bookingNo = ?', 
            [bookingNo]
        );
        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Booking deleted successfully' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong'
        });
    }
}
