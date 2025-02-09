import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { name, department, password } = await req.json();

        const buffer = Buffer.from(password);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryName] = await connection.execute(
            'SELECT id FROM managementAdmin WHERE name = ? AND accountStatus = true', 
            [name]
        );
        const nameExists = queryName as [];

        if (nameExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Management admin name already in use. Please choose another one.' 
            });
        }

        await connection.execute(
            'INSERT INTO managementAdmin (name, department, password, accountStatus, loginStatus) VALUES (?, ?, ?, ?, ?)', 
            [name, department, hashedPassword, true, false]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Management admin successfully added.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
