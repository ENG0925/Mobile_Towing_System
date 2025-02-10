import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const connection = await mysql.createConnection(DBConfig);
    
    const [totalVehicle] = await connection.execute(`
      SELECT 
        COUNT(id) AS num
      FROM 
        vehicle
      WHERE
        isDeleted = FALSE
    `) as any;

    const [confirmBookings] = await connection.execute(`
      SELECT 
        COUNT(bookingNo) AS num
      FROM 
        towbooking
      WHERE 
        status = "complete"
    `) as any;

    const [activeDrivers] = await connection.execute(`
      SELECT 
        COUNT(id) AS num
      FROM 
        driver
      WHERE 
        loginStatus = TRUE
      AND
        accountStatus = TRUE
    `) as any;

    const [avgRating] = await connection.execute(`
      SELECT 
        ROUND(AVG(rating), 2) AS avgRating
      FROM 
        feedback
    `) as any;

    const [recentFeedback] = await connection.execute(`
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
      ORDER BY 
        id DESC
      LIMIT 3
    `);

    const [recentBookings] = await connection.execute(`
      SELECT 
        v.model AS vehicle,
        u.name AS customerName,
        tb.status
      FROM 
        towbooking tb
      LEFT JOIN 
        vehicle v ON tb.vehicleID = v.id
      LEFT JOIN 
        user u ON tb.userID = u.id
      ORDER BY 
        tb.bookingNo DESC
      LIMIT 3
    `);
    connection.end();

    const dashboardInfo = {
      totalVehicle: totalVehicle[0].num,
      confirmBookings: confirmBookings[0].num,
      activeDrivers: activeDrivers[0].num,
      avgRating: avgRating[0].avgRating,
      recentFeedback,
      recentBookings,
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved all drivers successfully.',
      data: dashboardInfo,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
