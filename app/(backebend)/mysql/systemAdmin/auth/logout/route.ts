
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface SystemAdmin {
  id: number;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [querySystemAdmin] = await connection.execute('SELECT id FROM systemadmin WHERE id = ?',[id]);
    const systemAdmin = querySystemAdmin as SystemAdmin[];
    
    if (systemAdmin.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'System admin not found' 
      });
    }
    
    await connection.execute('UPDATE systemadmin SET loginStatus = ? WHERE id = ?', [false, systemAdmin[0].id]);
    
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
