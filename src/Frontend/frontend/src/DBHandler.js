import axios from 'axios';

export function handleSubmissions(files, setFiles, setSubmittedFiles, setPreviews, setResults, setIsLoading, updateSubmitDisabled) {
    const url = 'http://localhost:4999/upload';
    const formData = new FormData();
    setSubmittedFiles(files);
    setPreviews([]);
    setResults([]);
    files.forEach((file) => {
        formData.append(`${file.name}`, file);
    });

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };

    setIsLoading(true);
    updateSubmitDisabled(true);

    axios.post(url, formData, config)
        .then((response) => {
            console.log(response.data);
            setFiles([]);
            setResults(response.data);
        })
        .catch((error) => {
            console.error("Error uploading files: ", error);
        })
        .finally(() => {
            setIsLoading(false);
            updateSubmitDisabled(false);
        });
} 
