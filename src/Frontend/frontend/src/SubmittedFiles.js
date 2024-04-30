import React from 'react';

function SubmittedFiles({ submittedFiles, results, isLoading }) {
  return (
    <div>
      {submittedFiles.length > 0 && (
        <section className="submitted-images-container">
          <div className="submitted-images">
            {submittedFiles.map((file, index) => (
              <div key={index} className="submitted-image-container">
                <img src={URL.createObjectURL(file)} alt={file.name} className="submitted-image" /> {isLoading ? "Loading..." : results[index]}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default SubmittedFiles;
