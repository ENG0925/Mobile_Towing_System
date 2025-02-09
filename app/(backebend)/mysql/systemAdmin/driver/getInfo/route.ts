import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Driver {
  id: number;
  name: string;
  phoneNumber: number;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryDriver] = await connection.execute(`
      SELECT 
        id,
        name,
        phoneNumber,
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
        driver
      WHERE 
        accountStatus = TRUE
      AND 
        id = ?
    `, [id]);
    
    const driver = queryDriver as Driver[];

    const base64Encoded = driver[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8'); 

    const data = {
      id: driver[0].id,
      name: driver[0].name,
      phoneNumber: driver[0].phoneNumber,
      password: unhashedPassword,
      accountStatus: driver[0].accountStatus? true : false,
      loginStatus: driver[0].loginStatus? true : false,
    }

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved driver info successfully.',
      data: data,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
