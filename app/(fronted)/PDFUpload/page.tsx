'use client';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const PDFUpload = () => {
  const [file, setFile] = useState<any>(null);
  const [newFileName, setNewFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      // Set default new filename without .pdf extension
      setNewFileName(selectedFile.name.replace('.pdf', ''));
      setError('');
    } else {
      setFile(null);
      setNewFileName('');
      setError('Please select a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (!newFileName.trim()) {
      setError('Please enter a file name');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('pdf', file);
      console.log(file);

      formData.append('newFileName', newFileName.trim());

      console.log(formData);
      
      const response = await fetch('/mysql/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      setSuccess(`File uploaded successfully as ${data.fileName}`);
      setFile(null);
      setNewFileName('');
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      setError('Failed to upload file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pdf-upload">Select PDF File</Label>
          <Input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        {file && (
          <div className="space-y-2">
            <Label htmlFor="file-name">New File Name</Label>
            <Input
              id="file-name"
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter new file name"
            />
            <p className="text-sm text-gray-500">
              Original file: {file.name}
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleUpload}
        disabled={!file || loading || !newFileName.trim()}
        className="w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4 animate-spin" />
            Uploading...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload PDF
          </span>
        )}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PDFUpload;