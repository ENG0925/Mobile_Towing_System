import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [ratings] = await connection.execute(`
      SELECT 
          f.id,
          u.name,
          f.comment,
          f.rating,
          (SELECT COUNT(*) FROM likefeedback lf WHERE lf.feedbackID = f.id AND lf.isLike = 1) AS numLike
      FROM 
          feedback f
      LEFT JOIN 
          user u ON f.userID = u.id
    `);

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved all ratings successfully.',
      data: ratings,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
