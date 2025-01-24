
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

    const [queryDriverAdmin] = await connection.execute('SELECT id, password FROM driver WHERE name = ? OR email = ?',[username, username]);
    const driver = queryDriverAdmin as Driver[];
    
    connection.end();

    if (driver.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Driver not found' 
      });
    }

    if (driver[0].password !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }

    localStorage.setItem("driverID", driver[0].id.toString());
    
    return NextResponse.json({ 
      success: true,
      message: 'Login success', 
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
