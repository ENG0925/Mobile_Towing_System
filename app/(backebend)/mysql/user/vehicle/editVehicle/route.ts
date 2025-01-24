
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface Policy {
  hasPolicy: boolean;
  policyNo: string;
  icNumber: string;
  policyHolderName: string;
  uploadFile: File;
}

interface Vehicle {
  color: string;
  plateNumber: string;
  model: string;
}

interface VehicleID {
  id: number;
}

interface ReqData {
  policy: Policy;
  vehicle: Vehicle;
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const response  = await req.json();
    const data : ReqData= response.data;

    const userID = Number(localStorage.getItem('userID'));

    const connection = await mysql.createConnection(DBConfig);
    await connection.beginTransaction();

    await connection.execute('UPDATE vehicle SET plateNumber = ?, model = ?, color = ? WHERE userID = ?', [data.vehicle.plateNumber, data.vehicle.model, data.vehicle.color, userID]);
    const [queryVehicle] = await connection.execute('SELECT id FROM vehicle WHERE userID = ?', [userID]);
    const vehicleID = queryVehicle as VehicleID[];
    
    if (data.policy.hasPolicy) {
      await connection.execute('UPDATE insurancepolicy SET policyNo = ?, policyholderName = ?, icNumber = ?, policyFile = ? WHERE vehicleID = ?', [data.policy.policyNo, data.policy.policyHolderName, data.policy.icNumber, data.policy.uploadFile, vehicleID[0].id]);
    }

    await connection.commit();
    connection.end();

    return NextResponse.json({ 
      success: true, 
      message: 'vehicle info updated' 
    });
    
  } catch (err) {
      return NextResponse.json({ 
        success: false, 
        message: 'Something went wrong' 
      });
  }
}