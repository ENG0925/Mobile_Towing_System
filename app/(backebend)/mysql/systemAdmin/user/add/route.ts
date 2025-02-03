
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { 
            adminName, 
            adminEmail, 
            adminPassword 
        } = await req.json();

        const buffer = Buffer.from(adminPassword);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryAdminName] = await connection.execute(
            'SELECT adminID FROM admin WHERE adminName = ?', 
            [adminName]
        );
        const adminNameExists = queryAdminName as [];

        if (adminNameExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Username already in use. Please choose another one.' 
            });
        }

        const [queryAdminEmail] = await connection.execute(
            'SELECT adminID FROM admin WHERE adminEmail = ?', 
            [adminEmail]
        );
        const adminEmailExists = queryAdminEmail as [];

        if (adminEmailExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Email already in use. Please use a different one.' 
            });
        }

        await connection.execute(
            'INSERT INTO admin (adminName, adminEmail, adminPassword) VALUES (?, ?, ?)', 
            [adminName, adminEmail, hashedPassword]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Admin successfully added.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Error encountered while adding admin. Please try again later.' 
        });
    }
}
