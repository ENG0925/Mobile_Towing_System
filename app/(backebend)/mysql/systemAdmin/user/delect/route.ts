import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface AdminID {
    adminID: number;
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const { adminID } = await req.json(); 

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryAdminID] = await connection.execute(
            'SELECT adminID FROM admin WHERE adminName = ? AND adminEmail = ? AND adminPassword = ?', 
            [process.env.SUPER_ADMIN_NAME, process.env.SUPER_ADMIN_EMAIL, process.env.SUPER_ADMIN_PASSWORD]
        );
        const adminIDExists = queryAdminID as AdminID[];

        if (adminIDExists[0].adminID === adminID) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Cannot delete super admin.' 
            });
        }

        await connection.execute(
            'DELETE FROM admin WHERE adminID = ?', 
            [adminID]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Admin deleted successfully.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Error encountered while deleting admin. Please try again later.' 
        });
    }
}


