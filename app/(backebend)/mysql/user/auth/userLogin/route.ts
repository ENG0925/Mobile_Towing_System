
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface User {
  id: number;
  password: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const connection = await mysql.createConnection(DBConfig);

    const [queryUser] = await connection.execute('SELECT id, password FROM user WHERE name = ? OR email = ?',[username, username]);
    const user = queryUser as User[];
    
    connection.end();

    if (user.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (user[0].password !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password not match' 
      });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Login success', 
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Error to user login api' 
    });
  }
}
