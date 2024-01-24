import React from 'react';

function ImageUploader() {
    const upload = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.file.files[0]);
        // await uploadFile(formData);
    };

    return (
        <form encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">업로드</button>
        </form>
    );
}

export default ImageUploader;
