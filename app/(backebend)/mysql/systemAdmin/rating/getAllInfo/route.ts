import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [ratings] = await connection.execute('SELECT * FROM rating');

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved all ratings successfully.',
      data: ratings,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
