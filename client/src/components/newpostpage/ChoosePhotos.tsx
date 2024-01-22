import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ChoosePhotos() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles:any) => {
    const formData = new FormData();

    acceptedFiles.forEach((file:any, index:any) => {
      formData.append(`photos`, file);
    });

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setUploadedFiles(responseData.files);
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 5
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <div>
        <h4>Uploaded Files:</h4>
        <ul>
          {uploadedFiles.map((file:any, index:any) => (
            <li key={index}>{file.filename} ({(file.size / 1024).toFixed(2)} KB)</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChoosePhotos;

