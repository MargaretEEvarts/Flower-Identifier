import React from 'react';

function FilePreviews({ previews, removeFile }) {
  return (
    <div className="thumbs-container">
      {previews.map(({ file, preview }, index) => (
        <div key={index} className="thumb-container">
          <div>
            <img src={preview} alt={file.name} className="thumb-img" />
            <p>{file.name} - {file.size} bytes</p>
          </div>
          <div>
            <button onClick={() => removeFile(index)}>
              <img src="https://th.bing.com/th/id/OIP.YYZ0wNRDxZ7RT2Hg1x0lhgAAAA?rs=1&pid=ImgDetMain" alt="Trash Can Icon" className="trash-icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilePreviews;
