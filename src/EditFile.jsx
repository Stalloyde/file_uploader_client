import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

EditFile.propTypes = {
  handleInput: PropTypes.func,
  fileId: PropTypes.string,
  targetFile: PropTypes.object,
};

function EditFile({ handleInput, fileId, targetFile }) {
  const [newFileName, setNewFileName] = useState(targetFile.fileName);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  async function editFile(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/file/${fileId}/edit`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify({ newFileName }),
        },
      );
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();
      if (responseData.errors) {
        setErrorMessage(responseData.errors);
      } else {
        setErrorMessage();
        handleInput();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form method='POST' onSubmit={(e) => editFile(e)}>
        <input
          type='text'
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button>Save</button>
        <button type='button' onClick={handleInput}>
          Cancel
        </button>
        {errorMessage ? errorMessage.map((err) => err.msg) : null}
      </form>
      <p>Created on {targetFile.createdAt}</p>
    </>
  );
}

export default EditFile;
