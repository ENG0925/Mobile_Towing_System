
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

    const [queryUser] = await connection.execute(
      `SELECT id, password FROM user 
       WHERE (name = ? OR email = ?) 
       AND accountStatus = true`, 
      [username, username]
    );
    
    const user = queryUser as User[];
    
    

    if (user.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const base64Encoded = user[0].password; 
    const buffer = Buffer.from(base64Encoded, 'base64');
    const unhashedPassword = buffer.toString('utf-8'); 

    if (unhashedPassword !== password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password is incorrect' 
      });
    }

    await connection.execute('UPDATE user SET loginStatus = ? WHERE id = ?', [true, user[0].id]);

    
    
    connection.end();
    
    return NextResponse.json({ 
      success: true,
      message: 'Login success', 
      id: user[0].id
    });
    
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
