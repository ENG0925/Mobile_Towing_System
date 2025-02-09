import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const { 
            name, 
            department, 
            password, 
            id
        } = await req.json();

        const buffer = Buffer.from(password);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryName] = await connection.execute(
            'SELECT id FROM managementAdmin WHERE name = ? AND id != ? AND accountStatus = true', 
            [name, id]
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
            'UPDATE managementAdmin SET name = ?, department = ?, password = ? WHERE id = ?', 
            [name, department, hashedPassword, id]
        );
        
        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'Management admin updated successfully.' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
