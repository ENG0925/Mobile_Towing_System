
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface ManagementAdmin {
  id: number;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [queryManagementmAdmin] = await connection.execute('SELECT id FROM managementAdmin WHERE id = ?',[id]);
    const managementAdmin = queryManagementmAdmin as ManagementAdmin[];
    
    if (managementAdmin.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Management admin not found' 
      });
    }
    
    await connection.execute('UPDATE managementAdmin SET loginStatus = ? WHERE id = ?', [false, managementAdmin[0].id]);
    
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
