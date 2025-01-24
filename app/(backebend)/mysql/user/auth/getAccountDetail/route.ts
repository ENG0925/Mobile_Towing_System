
import mysql from 'mysql2/promise';
import { DBConfig } from "@/config/db";
import { NextResponse, NextRequest } from "next/server";

interface User {
    id: number;
    name: string;
    email: string;
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

        const data: User = user[0];

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
