
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface User {
  id: number;
}
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { userName, email, contact, id } = await req.json();

    const connection = await mysql.createConnection(DBConfig);
    await connection.beginTransaction();
  
    const [queryUser] = await connection.execute('SELECT id FROM user WHERE id = ? AND accountStatus = true', [id]);
        
    const user = queryUser as User[];

    if (user.length === 0) {
        connection.end();
        return NextResponse.json({ 
            success: false, 
            message: "User not found",
        });
    }

    const [queryUserNameEmailExists] = await connection.execute(
      'SELECT * FROM user WHERE name = ? AND email = ? AND id != ? AND accountStatus = true', 
      [userName, email, id]
    );

    const userNameEmailExists = queryUserNameEmailExists as [];

    if (userNameEmailExists.length > 0) {
      await connection.rollback();
      return NextResponse.json({ 
        success: false, 
        message: 'User name and email already exists. Please choose another one.' 
      });
    }


    const [queryUserNameExists] = await connection.execute(
        'SELECT * FROM user WHERE name = ? AND id != ? AND accountStatus = true', 
        [userName, id]
    );
    const userNameExists = queryUserNameExists as [];

    if (userNameExists.length > 0) {
      await connection.rollback();
      return NextResponse.json({ 
        success: false, 
        message: 'User name already exists. Please choose another one.' 
      });
    }

    const [queryUserEmailExists] = await connection.execute('SELECT * FROM user WHERE email = ? AND id != ? AND accountStatus = true', [email, id]);
    const userEmailExists = queryUserEmailExists as [];

    if (userEmailExists.length > 0) {
      await connection.rollback();
      return NextResponse.json({ 
        success: false, 
        message: 'Email already exists. Please choose another one.' 
      });
    }

    await connection.execute('UPDATE user SET name = ?, email = ?, phoneNumber = ? WHERE id = ?', [userName, email, contact, id]);

    await connection.commit();
    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'User info updated' 
    });
    
  } catch (err) {
      return NextResponse.json({ 
        success: false, 
        message: "Something went wrong" 
      });
  }
}