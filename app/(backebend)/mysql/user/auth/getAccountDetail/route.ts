
import mysql from 'mysql2/promise';
import { DBConfig } from "@/config/db";
import { NextResponse, NextRequest } from "next/server";

interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    accountStatus: boolean;
    loginStatus: boolean;
}
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { id } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        const [queryUser] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);

        const user = queryUser as User[];

        if (user.length === 0) {
            connection.end();
            return NextResponse.json({ 
                success: false, 
                message: "User not found",
            });
        }

        const base64Encoded = user[0].password; 
        const buffer = Buffer.from(base64Encoded, 'base64');
        const unhashedPassword = buffer.toString('utf-8'); 

        const data: User = {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            phoneNumber: user[0].phoneNumber,
            password: unhashedPassword,
            accountStatus: user[0].accountStatus,
            loginStatus: user[0].loginStatus,
        };

        connection.end();

        return NextResponse.json({ 
            success: true, 
            message:"Data fetched successfully",
            data: data
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: "Something went wrong",
        });
    }
}
