
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface ManagementAdmin {
  id: number;
  password: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [queryManagementmAdmin] = await connection.execute('SELECT id, password FROM managementadmin WHERE name = ? AND accountStatus = true',[username]);
    const managementAdmin = queryManagementmAdmin as ManagementAdmin[];
    
    

    if (managementAdmin.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Management admin not found' 
      });
    }

    const base64Encoded = managementAdmin[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8');

    if (unhashedPassword !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }

    await connection.execute('UPDATE managementAdmin SET loginStatus = ? WHERE id = ?', [true, managementAdmin[0].id]);

    connection.end();

    return NextResponse.json({ 
      success: true,
      message: 'Login success', 
      id: managementAdmin[0].id
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
