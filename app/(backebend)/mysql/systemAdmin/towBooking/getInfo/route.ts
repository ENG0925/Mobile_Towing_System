import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { bookingNo } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryTowBooking] = await connection.execute(`
      SELECT 
        tb.bookingNo,
        tb.userID,
        tb.vehicleID,
        tb.driverID,
        CAST(tb.bookingDate AS CHAR) AS bookingDate,
        tb.serviceLocation,
        tb.towingLocation,
        CAST(tb.distance AS CHAR) AS distance,
        CAST(tb.estimatedCost AS CHAR) AS estimatedCost,
        tb.status 
      FROM 
        towbooking tb
      LEFT JOIN
        payment p ON tb.bookingNo = p.bookingNo
      WHERE 
        tb.bookingNo = ?
      GROUP BY 
        tb.bookingNo, tb.userID, tb.vehicleID, tb.driverID, bookingDate, tb.serviceLocation, tb.towingLocation, distance, estimatedCost, tb.status;
    `, [bookingNo]);
    
    const towBooking = queryTowBooking as any[];

    const data = {
      bookingNo: towBooking[0].bookingNo,
      userID: towBooking[0].userID,
      vehicleID: towBooking[0].vehicleID,
      driverID: towBooking[0].driverID,
      bookingDate: towBooking[0].bookingDate,
      serviceLocation: towBooking[0].serviceLocation,
      towingLocation: towBooking[0].towingLocation,
      distance: towBooking[0].distance,
      estimatedCost: towBooking[0].estimatedCost,
      status: towBooking[0].status,
      isWaive: towBooking[0].isWaive === 1 ? true : false,
    }
    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Get user info successfully',
      data: data,
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
