import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface User {
    id: number;
}
export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const { username, email } = await req.json();
        
        const connection = await mysql.createConnection(DBConfig);

        const [checkUsername] = await connection.execute('SELECT id FROM user WHERE name = ? AND accountStatus = true', [username]);
        const [checkEmail] = await connection.execute('SELECT id FROM user WHERE email = ? AND accountStatus = true', [email]);

        connection.end();
        
        const existingEmail = checkEmail as User[];
        const existingUsername = checkUsername as User[];

        if (existingUsername.length > 0 && existingEmail.length > 0) {
            return NextResponse.json({ 
                success: false, 
                message: 'Username and Email already exists' 
            });
        }

        if (existingUsername.length > 0) {
            return NextResponse.json({ 
                success: false, 
                message: 'Username already exists' 
            });
        }

        if (existingEmail.length > 0) {
            return NextResponse.json({ 
                success: false, 
                message: 'Email already exists' 
            });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Username and Email available'
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}