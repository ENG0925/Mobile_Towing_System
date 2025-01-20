
import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

interface ReqData {
    account: Account;
}

interface Account {
    confirmPassword: string;
    contactNumber: string;
    email: string;
    password: string;
    username: string;
}

interface policy {
    hasPolicy: boolean;
    icNumber: string;
    policyHolderName: string;
    uploadFile: string;
}

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const response  = await req.json();
        const data : Signup= response.data;

        
        const buffer = Buffer.from(data.password);
        const hashedPassword = buffer.toString("base64");

        const connection = await mysql.createConnection(DBConfig);
        await connection.beginTransaction();

        
        const [queryResult] = await connection.execute('SELECT * FROM user WHERE userName = ? OR userEmail = ?', [data.username, data.emailAddress]);
        const existingUser = queryResult as DatabaseUser[];

        const existingUsername = existingUser.filter(user => user.userName === data.username);
        const existingEmail = existingUser.filter(user => user.userEmail === data.emailAddress);
        
        // Check if username and email already exist
        if (existingUsername.length > 0 && existingEmail.length > 0) {
            await connection.rollback(); 
            connection.end(); 
            return NextResponse.json({ success: false, message: 'Username and email already exist' });
        }

        // Check if username already exist
        if (existingUsername.length > 0) {
            await connection.rollback(); 
            connection.end(); 
            return NextResponse.json({ success: false, message: 'Username already exists' });
        }

        // Check if email already exist
        if (existingEmail.length > 0) {
            await connection.rollback(); 
            connection.end(); 
            return NextResponse.json({ success: false, message: 'Email already exists' });
        }

        // insert user data
        await connection.execute('INSERT INTO user (userName, userPassword, userEmail) VALUES (?, ?, ?)', [data.username, hashedPassword, data.emailAddress]);

        // get userID, currenciesID and safetyQuestionID
        const [queryResultUserID] = await connection.execute('SELECT userID FROM user WHERE userName = ? AND userEmail = ?', [data.username, data.emailAddress]);
        const [queryResultCurrenciesID] = await connection.execute('SELECT currenciesID FROM currencies WHERE currenciesShortForm = ?', ['MYR']);
        const [queryResultSafetyQuestionID] = await connection.execute('SELECT safetyQuestionID FROM safetyquestion WHERE description = ?', [data.safetyQuestion]);

        const userID = queryResultUserID as DatabaseUser[];
        const currenciesID = queryResultCurrenciesID as DatabaseCurrencies[];
        const safetyQuestionID = queryResultSafetyQuestionID as DatabaseSafetyQuestion[];

        // insert user currency
        await connection.execute('INSERT INTO currenciesuser (currenciesID, userID) VALUES (?, ?)', [currenciesID[0].currenciesID, userID[0].userID]);

        // insert user safety question
        await connection.execute('INSERT INTO safetyquestionans (safetyQuestionID, userID, ans) VALUES (?, ?, ?)', [safetyQuestionID[0].safetyQuestionID, userID[0].userID, data.safetyAnswer]);

        await connection.commit();
        connection.end();

        return NextResponse.json({ 
            userID: userID[0].userID,
            success: true, 
            message: 'Signup successful' 
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: 'Error to user signup api' 
        });
    }
}