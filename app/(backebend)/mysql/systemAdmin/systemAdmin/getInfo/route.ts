import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface SystemAdmin {
  id: number;
  name: string;
  adminLevel: number;
  password: string;
  accountStatus: number;
  loginStatus: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryAdmin] = await connection.execute(`
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
        id = ?
    `, [id]);
    
    const admin = queryAdmin as SystemAdmin[];

    const base64Encoded = admin[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8'); 

    const data = {
      id: admin[0].id,
      name: admin[0].name,
      adminLevel: admin[0].adminLevel,
      password: unhashedPassword,
      accountStatus: admin[0].accountStatus? true : false,
      loginStatus: admin[0].loginStatus? true : false,
    }


    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get system admin info successfully',
      data: data,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
