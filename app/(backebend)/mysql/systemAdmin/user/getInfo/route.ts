import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryUser] = await connection.execute(`
      SELECT 
        id,
        name,
        email,
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
        user
      WHERE 
        accountStatus = TRUE
      AND 
        id = ?
    `, [id]);
    
    const user = queryUser as User[];

    const base64Encoded = user[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8'); 

    const data = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      phoneNumber: user[0].phoneNumber,
      password: unhashedPassword,
      accountStatus: user[0].accountStatus? true : false,
      loginStatus: user[0].loginStatus? true : false,
    }

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get user info successfully',
      data: data
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
