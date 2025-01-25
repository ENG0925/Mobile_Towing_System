
import mysql from 'mysql2/promise';
import { DBConfig } from "@/config/db";
import { NextResponse, NextRequest } from "next/server";

interface User {
    name: string;
    email: string;
}
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { id } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        const [queryUser] = await connection.execute('SELECT name, email FROM user WHERE id = ?', [id]);

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
