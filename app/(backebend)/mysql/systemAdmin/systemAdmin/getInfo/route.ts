import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface SystemAdmin {
  id: number;
  name: string;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryAdmin] = await connection.execute(`SELECT * FROM systemAdmin WHERE id = ?`, [id]);
    
    const admin = queryAdmin as SystemAdmin[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get system admin info successfully',
      data: admin[0] || null
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
