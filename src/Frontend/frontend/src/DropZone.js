import React from 'react';
import { useDropzone } from 'react-dropzone';

function DropZone({ onDrop, isDragActive }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    type: 'file',
    name: 'image_file',
    multiple: true
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default DropZone;
