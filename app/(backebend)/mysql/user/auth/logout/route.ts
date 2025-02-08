
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


interface User {
  id: number;
}

export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    const connection = await mysql.createConnection(DBConfig);
    console.log('id', id);

    const [queryUser] = await connection.execute('SELECT id FROM user WHERE id = ?',[id]);
    const user = queryUser as User[];
    
    if (user.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    await connection.execute('UPDATE user SET loginStatus = ? WHERE id = ?', [false, user[0].id]);
    
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
