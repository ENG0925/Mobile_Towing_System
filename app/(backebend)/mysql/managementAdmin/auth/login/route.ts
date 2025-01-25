
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

    const [queryManagementmAdmin] = await connection.execute('SELECT id, password FROM managementadmin WHERE name = ? OR email = ?',[username, username]);
    const managementAdmin = queryManagementmAdmin as ManagementAdmin[];
    
    connection.end();

    if (managementAdmin.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Management admin not found' 
      });
    }

    if (managementAdmin[0].password !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }

    localStorage.setItem("managementAdminID", managementAdmin[0].id.toString());
    
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
