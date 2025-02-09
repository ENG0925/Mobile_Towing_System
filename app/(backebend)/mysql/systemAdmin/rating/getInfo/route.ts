import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Rating {
  id: number;
  userID: number;
  comment: string;
  rating: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryRating] = await connection.execute(
      'SELECT * FROM feedback WHERE id = ?', 
      [id]
    );
    
    const rating = queryRating as Rating[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved feedback info successfully.',
      data: rating[0] || null
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
