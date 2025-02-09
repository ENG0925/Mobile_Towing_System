import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [admins] = await connection.execute(`
      SELECT 
        id,
        name,
        adminLevel,
        password,
        CASE 
          WHEN accountStatus = 1 THEN TRUE 
          ELSE FALSE 
        END AS accountStatus,
        CASE 
          WHEN loginStatus = 1 THEN TRUE 
          ELSE FALSE 
        END AS loginStatus
      FROM 
        systemAdmin
      WHERE 
        accountStatus = TRUE
    `);
    
    

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get all system admin info successfully',
      data: admins,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
