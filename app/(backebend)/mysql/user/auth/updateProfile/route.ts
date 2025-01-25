
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { userName, email, contact } = await req.json();

    const userID = Number(localStorage.getItem('userID'));

    const connection = await mysql.createConnection(DBConfig);
    await connection.beginTransaction();
  
    const [queryUserNameEmailExists] = await connection.execute(
      'SELECT * FROM user WHERE name = ? AND email = ? AND id != ?', 
      [userName, email, userID]
    );

    const userNameEmailExists = queryUserNameEmailExists as [];

    if (userNameEmailExists.length > 0) {
      await connection.rollback();
      return NextResponse.json({ 
        success: false, 
        message: 'User name and email already exists. Please choose another one.' 
      });
    }


    const [queryUserNameExists] = await connection.execute('SELECT * FROM user WHERE username = ? AND id != ?', [userName, userID]);
    const userNameExists = queryUserNameExists as [];

    if (userNameExists.length > 0) {
      await connection.rollback();
      return NextResponse.json({ 
        success: false, 
        message: 'User name already exists. Please choose another one.' 
      });
    }

    const [queryUserEmailExists] = await connection.execute('SELECT * FROM user WHERE email = ? AND id != ?', [email, userID]);
    const userEmailExists = queryUserEmailExists as [];

    if (userEmailExists.length > 0) {
      await connection.rollback();
      return NextResponse.json({ 
        success: false, 
        message: 'Email already exists. Please choose another one.' 
      });
    }

    await connection.execute('UPDATE user SET username = ?, email = ?, phoneNumber = ? WHERE id = ?', [userName, email, contact, userID]);

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