import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [towBooking] = await connection.execute(`
      SELECT 
        tb.bookingNo,
        u.name,
        v.model as vehicle,
        CAST(tb.bookingDate AS CHAR) AS bookingDate,
        CAST(tb.distance AS CHAR) AS distance,
        CAST(tb.estimatedCost AS CHAR) AS estimatedCost,
        tb.status 
      FROM 
        towbooking tb
      LEFT JOIN 
        user u ON tb.userID = u.id
      LEFT JOIN
        vehicle v ON tb.vehicleID = v.id
      LEFT JOIN
        payment p ON tb.bookingNo = p.bookingNo
      GROUP BY 
        tb.bookingNo, u.name, vehicle, bookingDate, distance, estimatedCost, tb.status;
    `);

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get all tow booking info successfully',
      data: towBooking,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: err
    });
  }
}
