import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

CreateNewFolder.propTypes = {
  setTargetInput: PropTypes.func,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setErrorMessage: PropTypes.func,
  getAllFolders: PropTypes.func,
};

function CreateNewFolder({
  setTargetInput,
  errorMessage,
  setErrorMessage,
  getAllFolders,
}) {
  const [newFolderName, setNewFolderName] = useState('');

  const navigate = useNavigate();

  function handleInputChange(e) {
    setNewFolderName(e.target.value);
  }

  async function createNewFolder(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/folders/create', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
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
        setTargetInput('');
        getAllFolders();
        setErrorMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form method='POST' onSubmit={(e) => createNewFolder(e)}>
      <input
        type='text'
        id='create-folder'
        placeholder='Name of new folder'
        value={newFolderName}
        onChange={(e) => handleInputChange(e)}
        required
      />

      <button>Create</button>
      <button type='button' onClick={() => setTargetInput()}>
        Cancel
      </button>
      {errorMessage ? errorMessage.map((err) => err.msg) : null}
    </form>
  );
}

export default CreateNewFolder;
