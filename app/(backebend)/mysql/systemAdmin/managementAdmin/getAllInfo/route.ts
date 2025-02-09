import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [admins] = await connection.execute('SELECT * FROM managementAdmin');

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get all management admins info successfully.',
      data: admins,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
