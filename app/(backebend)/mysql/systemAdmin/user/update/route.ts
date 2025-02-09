import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const { 
            name, 
            email, 
            phoneNumber, 
            password,
            id
        } = await req.json();

        const buffer = Buffer.from(password);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryName] = await connection.execute(
            'SELECT id FROM user WHERE name = ? AND accountStatus = true AND id != ?', 
            [name, id]
        );
        const nameExists = queryName as [];

        const [queryEmail] = await connection.execute(
            'SELECT id FROM user WHERE email = ? AND accountStatus = true AND id != ?', 
            [email, id]
        );
        const emailExists = queryEmail as [];

        if (nameExists.length > 0 && emailExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Username and Email already in use. Please choose another one.' 
            });
        }

        if (nameExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Username already in use. Please choose another one.' 
            });
        }

        

        if (emailExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Email already in use. Please use a different one.' 
            });
        }

        await connection.execute(
            'UPDATE user SET name = ?, email = ?, phoneNumber = ?, password = ? WHERE id = ?', 
            [name, email, phoneNumber, hashedPassword, id]
        );
        
        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'User updated successfully' 
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
