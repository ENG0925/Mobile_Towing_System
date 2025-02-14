
import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userID } = await req.json();

        const connection = await mysql.createConnection(DBConfig);
    
        const [queryFeedback] = await connection.execute(
            `SELECT 
                f.id,
                u.name,
                f.comment,
                f.rating,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM likefeedback lk 
                        WHERE lk.feedbackID = f.id 
                        AND lk.userID = ? 
                        AND lk.isLike = 1
                    ) THEN 1 
                    ELSE 0 
                END AS isLike,
                (SELECT COUNT(*) FROM likefeedback lk WHERE lk.feedbackID = f.id AND lk.isLike = 1) AS numLike
            FROM 
                feedback f
            LEFT JOIN 
                user u ON f.userID = u.id
            ORDER BY 
                numLike DESC`,
            [userID]
        );
        
        const feedback = queryFeedback as [];
    
        await connection.end();
    
        return NextResponse.json({ 
            success: true, 
            message: 'Successfully get all feedback',
            data: feedback
        });
    
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Something went wrong' 
        });
    }
}
