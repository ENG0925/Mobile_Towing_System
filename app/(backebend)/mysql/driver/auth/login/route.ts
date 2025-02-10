
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface Driver {
  id: number;
  password: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [queryDriver] = await connection.execute('SELECT id, password FROM driver WHERE name = ? AND accountStatus = true',[username]);
    const driver = queryDriver as Driver[];
    
    if (driver.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Driver not found' 
      });
    }

    const base64Encoded = driver[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8');

    if (unhashedPassword !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }


    await connection.execute('UPDATE driver SET loginStatus = ? WHERE id = ?', [true, driver[0].id]);
    
    connection.end();

    return NextResponse.json({ 
      success: true,
      message: 'Login success', 
      id: driver[0].id
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
