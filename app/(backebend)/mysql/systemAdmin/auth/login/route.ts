
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface SystemAdmin {
  id: number;
  password: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [querySystemAdmin] = await connection.execute('SELECT id, password FROM systemadmin WHERE name = ? OR email = ?',[username, username]);
    const systemAdmin = querySystemAdmin as SystemAdmin[];
    
    connection.end();

    if (systemAdmin.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'System admin not found' 
      });
    }

    if (systemAdmin[0].password !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }

    localStorage.setItem("systemAdminID", systemAdmin[0].id.toString());
    
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
