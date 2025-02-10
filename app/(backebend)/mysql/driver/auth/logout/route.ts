
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface Driver {
  id: number;
}

export async function PUT (req: NextRequest, res: NextResponse) {
  try {
    const { driverID } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [queryDriver] = await connection.execute('SELECT id FROM driver WHERE id = ?',[driverID]);
    const driver = queryDriver as Driver[];
    
    if (driver.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Driver not found' 
      });
    }
    
    await connection.execute('UPDATE driver SET loginStatus = ? WHERE id = ?', [false, driverID]);
    
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
