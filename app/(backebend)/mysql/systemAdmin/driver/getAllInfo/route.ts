import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [drivers] = await connection.execute('SELECT * FROM driver');

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved all drivers successfully.',
      data: drivers,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
