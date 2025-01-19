
import mysql from 'mysql2/promise';
import { DBConfig } from "@/config/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { id } = await req.json();

        const connection = await mysql.createConnection(DBConfig);

        const [query] = await connection.execute(
            'SELECT * FROM user WHERE id = ?', 
            [id]
        );

        const data = query;

        connection.end();

        return NextResponse.json({ 
            success: true, 
            message:"Data fetched successfully",
            data: data
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: "Error fetching data",
        });
    }
}
