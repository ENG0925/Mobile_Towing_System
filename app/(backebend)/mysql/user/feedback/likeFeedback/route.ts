import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userID, feedbackID , isLike } = await req.json();
        
        const connection = await mysql.createConnection(DBConfig);
        
        const [queryExistReview] = await connection.execute(
            'SELECT * FROM likefeedback WHERE feedbackID = ? AND userID = ?', 
            [feedbackID, userID]
        );
        const existReview = queryExistReview as []

        if(existReview.length === 0){
            await connection.execute(
                `INSERT INTO likefeedback (userID, feedbackID, isLike) VALUES (?, ?, ?)`,
                [userID, feedbackID, isLike]
            );
        } else {
            await connection.execute(
                `UPDATE likefeedback SET isLike = ? WHERE feedbackID = ? AND userID = ?`,
                [isLike, feedbackID, userID]
            )
        }

        await connection.end();
    
        return NextResponse.json({ 
            success: true, 
            message: 'Successfully like feedback'
        });
    
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
