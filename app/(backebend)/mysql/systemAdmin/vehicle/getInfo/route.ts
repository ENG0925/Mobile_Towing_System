import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Vehicle {
  id: number;
  userID: number;
  plateNumber: string;
  model: string;
  color: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    
    const connection = await mysql.createConnection(DBConfig);
    
    const [queryVehicle] = await connection.execute(`
      SELECT 
        vehicle.*,
        user.name 
      FROM 
        vehicle 
      LEFT JOIN
        user ON vehicle.userID = user.id  
      WHERE vehicle.id = ? 
    `, [id]);
    
    const vehicle = queryVehicle as Vehicle[];

    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'Retrieved vehicle info successfully.',
      data: vehicle[0] || null
    });
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      message: 'Something went wrong' 
    });
  }
}
