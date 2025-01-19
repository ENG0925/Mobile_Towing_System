import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        
        const connection = await mysql.createConnection(DBConfig);
        connection.end();
        return NextResponse.json({ 
            success: true, 
            message: 'Successfully connected to the database' 
        });

    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to connect to the database' 
        });
    }
}
  