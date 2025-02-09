import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [user] = await connection.execute(`
      SELECT 
        id,
        plateNumber,
        model
      FROM 
        vehicle
      WHERE 
        isDeleted = FALSE
    `);

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get all vehicle info successfully',
      data: user,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
