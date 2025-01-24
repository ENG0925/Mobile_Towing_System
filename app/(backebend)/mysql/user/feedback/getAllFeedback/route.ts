import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);

    const [feedback] = await connection.execute('SELECT * FROM feedback');

    await connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved all feedback info successfully',
      data: feedback,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
