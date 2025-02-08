import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    let newFileName = formData.get('newFileName') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log(file);

    if (!newFileName) {
      return NextResponse.json(
        { error: 'No file name provided' },
        { status: 400 }
      );
    }

    // Ensure filename has .pdf extension
    if (!newFileName.toLowerCase().endsWith('.pdf')) {
      newFileName += '.pdf';
    }

    // Get the file's binary data
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Specify the path where the file will be saved
    const publicDir = path.join(process.cwd(), 'public', 'policyFile');
    const filePath = path.join(publicDir, newFileName);

    // Write the file to the public directory
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true,
      fileName: newFileName,
      path: `/uploads/${newFileName}`
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}