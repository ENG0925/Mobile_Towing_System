import { DBConfig } from '@/config/db';
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface SafetyQuestionID {
    safetyQuestionID: number;
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const { data }: {data: User} = await req.json();

        const buffer = Buffer.from(data.userPassword);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        const [queryUserName] = await connection.execute(
            'SELECT userID FROM user WHERE userName = ? AND userID != ?', 
            [data.userName, data.userID]
        );
        const userNameExists = queryUserName as [];

        if (userNameExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Username already exists. Please choose another one.' 
            });
        }

        const [queryUserEmail] = await connection.execute(
            'SELECT userID FROM user WHERE userEmail = ? AND userID != ?', 
            [data.userEmail, data.userID]
        );
        const userEmailExists = queryUserEmail as [];

        if (userEmailExists.length > 0) {
            await connection.rollback();
            connection.end();

            return NextResponse.json({ 
                success: false, 
                message: 'Email already exists. Please choose another one.' 
            });
        }

        await connection.execute(
            'UPDATE user SET userName = ?, userPassword = ?, userEmail = ? WHERE userID = ?', 
            [data.userName, hashedPassword, data.userEmail, data.userID]
        );
        
        const [querySafetyQuestion] = await connection.execute(
            'SELECT safetyQuestionID FROM safetyquestion WHERE description = ?', 
            [data.safetyQuestion]
        );

        const safetyQuestion = querySafetyQuestion as SafetyQuestionID[];

        await connection.execute(
            'UPDATE safetyquestionans SET safetyQuestionID = ?, ans = ? WHERE userID = ?', 
            [safetyQuestion[0].safetyQuestionID, data.ans, data.userID]
        );

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'User updated successfully' 
        });
    } catch (err) {
        return NextResponse.json({ 
            success: false, 
            message: 'Error updating user. Please try again later.' 
        });
    }
}
