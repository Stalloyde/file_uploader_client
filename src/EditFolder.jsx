import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

EditFolder.propTypes = {
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setErrorMessage: PropTypes.func,
  getAllFolders: PropTypes.func,
  allFolders: PropTypes.array,
  targetInput: PropTypes.number,
  handleFolderInput: PropTypes.func,
};

function EditFolder({
  errorMessage,
  setErrorMessage,
  getAllFolders,
  allFolders,
  targetInput,
  handleFolderInput,
}) {
  const [newFolderName, setNewFolderName] = useState('');
  const navigate = useNavigate();

  const targetFolder = allFolders.find((folder) => folder.id === targetInput);

  useEffect(() => {
    setNewFolderName(targetFolder.folderName);
  }, []);

  function handleInputChange(e) {
    setNewFolderName(e.target.value);
  }

  async function EditFolder(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/folders/edit', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ newFolderName }),
      });
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();

      if (responseData.errors) {
        setErrorMessage(responseData.errors);
      } else {
        getAllFolders();
        setErrorMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form method='POST' onSubmit={(e) => EditFolder(e)}>
      <input
        type='text'
        id='create-folder'
        placeholder='Name of new folder'
        value={newFolderName}
        onChange={(e) => handleInputChange(e)}
        required
      />

      <button>Save</button>
      <button type='button' onClick={(e) => handleFolderInput(e)}>
        Cancel
      </button>
      {errorMessage ? errorMessage.map((err) => err.msg) : null}
    </form>
  );
}

export default EditFolder;
