import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Rating {
  id: number;
  name: string;
  comment: string;
  rating: string;
  numlike: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryRating] = await connection.execute(`SELECT * FROM rating WHERE userID = ? `, [id]);
    
    const user = queryRating as Rating[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get rating info successfully',
      data: rating[0]
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
