import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import DropZone from './DropZone';
import FilePreviews from './FilePreviews';
import SubmittedFiles from './SubmittedFiles';
import { handleSubmissions } from './DBHandler';
import './DropBox.css';

function DropBox() {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false); 

  const onDrop = useCallback((acceptedFiles) => {
    const updatedFiles = [...files];
    updatedFiles.push(...acceptedFiles);
    setFiles(updatedFiles);
    setPreviews(prevPreviews => [
      ...prevPreviews,
      ...acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
    ]);
  }, [files]);

  const removeFile = (indexToRemove) => {
    setPreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const { isDragActive } = useDropzone({
    onDrop,
    type: 'file',
    name: 'image_file',
    multiple: true
  });

  const handleSubmit = () => {
    handleSubmissions(files, setFiles, setSubmittedFiles, setPreviews, setResults, setIsLoading, setSubmitDisabled);
  };

  useEffect(() => {
    if (!isLoading) {
      setSubmitDisabled(false);
    }
  }, [isLoading]);

  return (
    <div className="wrapper">
      <div className="background">
        <div className="dropbox-container">
          <section className="container">
            <DropZone onDrop={onDrop} isDragActive={isDragActive} />
            <aside>
              <h4>Files</h4>
              <FilePreviews previews={previews} removeFile={removeFile} />
            </aside>
            <button onClick={handleSubmit} disabled={submitDisabled}>Submit</button>
          </section>
          <h4>Submitted files:</h4>
          <SubmittedFiles submittedFiles={submittedFiles} results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default DropBox;
