import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

UploadNewFile.propTypes = {
  getTargetFolderAndFiles: PropTypes.func,
};

function UploadNewFile({ getTargetFolderAndFiles }) {
  const [newFile, setNewFile] = useState(null);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const imageInputRef = useRef();

  const navigate = useNavigate();
  const { folderId } = useParams();

  function resetInput() {
    imageInputRef.current.value = '';
    setNewFile('');
    setErrorMessage();
    setIsCreatingFile(false);
  }

  async function upload(e) {
    e.preventDefault();
    setIsCreatingFile(true);

    const formData = new FormData();
    formData.append('newFile', newFile);

    try {
      const response = await fetch(
        `https://file-uploader-api.adaptable.app/folder/${folderId}/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: formData,
          mode: 'cors',
        },
      );
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();
      if (responseData.errors) {
        resetInput();
        setErrorMessage(responseData.errors);
      } else {
        resetInput();
        getTargetFolderAndFiles();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      method='POST'
      onSubmit={(e) => upload(e)}
      encType='multipart/form-data'>
      <label htmlFor='upload-file'>Upload New File</label>
      <input
        type='file'
        id='upload-file'
        accept='.jpg,.jpeg,.png'
        onChange={(e) => {
          setErrorMessage();
          setNewFile(e.target.files[0]);
        }}
        ref={imageInputRef}></input>
      {newFile && isCreatingFile ? (
        <>
          <button disabled>Uploading..</button>
          <button disabled>Cancel</button>
        </>
      ) : newFile && !isCreatingFile ? (
        <>
          <button>Upload</button>
          <button type='button' onClick={resetInput}>
            Cancel
          </button>
        </>
      ) : null}
      {errorMessage ? errorMessage.map((err) => err.msg) : null}
    </form>
  );
}

export default UploadNewFile;
