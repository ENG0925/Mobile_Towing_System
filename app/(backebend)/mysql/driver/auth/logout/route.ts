
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface Driver {
  id: number;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [queryDriver] = await connection.execute('SELECT id FROM driver WHERE id = ?',[id]);
    const driver = queryDriver as Driver[];
    
    if (driver.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Driver not found' 
      });
    }
    
    await connection.execute('UPDATE driver SET loginStatus = ? WHERE id = ?', [false, driver[0].id]);
    
    connection.end();

    return NextResponse.json({ 
      success: true,
      message: 'Logout success', 
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
