import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [vehicles] = await connection.execute(`
      SELECT 
        vehicle.*,
        user.name 
      FROM 
        vehicle 
      LEFT JOIN
        user ON vehicle.userID = user.id  
      WHERE isDeleted = false
    `);

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved all vehicles successfully.',
      data: vehicles,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
