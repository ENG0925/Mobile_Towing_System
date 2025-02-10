
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

    const [querySystemAdmin] = await connection.execute('SELECT id, password FROM systemadmin WHERE name = ? AND accountStatus = true',[username]);
    const systemAdmin = querySystemAdmin as SystemAdmin[];
    
    if (systemAdmin.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'System admin not found' 
      });
    }

    const base64Encoded = systemAdmin[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8');

    if (unhashedPassword !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }

    
    await connection.execute('UPDATE systemAdmin SET loginStatus = ? WHERE id = ?', [true, systemAdmin[0].id]);
    
    connection.end();
    return NextResponse.json({ 
      success: true,
      message: 'Login success', 
      id: systemAdmin[0].id
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
