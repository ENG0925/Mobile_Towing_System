import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Dashboard {
  id: number;
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryDashboard] = await connection.execute(`SELECT * FROM dashboard WHERE dashboardID = ? `, [id]);
    
    const user = queryDashboard as Dashboard[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get user info successfully',
      data: dashboard[0]
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
