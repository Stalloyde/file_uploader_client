import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import CreateNewFolder from './CreateNewFolder';

function Layout() {
  const [allFolders, setAllFolders] = useState([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const navigate = useNavigate();

  function handleCreatingFolderInput() {
    setIsCreatingFolder(!isCreatingFolder);
    setErrorMessage('');
  }

  async function getAllFolders() {
    try {
      const response = await fetch('http://localhost:3000/folders', {
        credentials: 'include',
      });
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();
      setAllFolders(responseData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAllFolders();
  }, []);

  return (
    <>
      <section>
        <h1>File Uploader</h1>
        <div>
          <h2>Folders</h2>
          <button onClick={handleCreatingFolderInput}>Create New Folder</button>
          {isCreatingFolder ? (
            <CreateNewFolder
              isCreatingFolder={isCreatingFolder}
              setIsCreatingFolder={setIsCreatingFolder}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              getAllFolders={getAllFolders}
              handleCreatingFolderInput={handleCreatingFolderInput}
            />
          ) : null}
          <ul>
            <li>
              <Link to='/folder'>All Folders</Link>
            </li>
            {allFolders.map((folder) => (
              <li key={folder.id} id={folder.id}>
                {isEditingFolder ? (
                  <form method='POST' onSubmit={(e) => editFolder(e)}>
                    <input
                      type='text'
                      id='edit-folder'
                      placeholder='New name of folder'
                      value={editValue}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />

                    <button>Save</button>
                    <button type='button' onClick={handleEditingFolderInput}>
                      Cancel
                    </button>
                    {errorMessage ? errorMessage.map((err) => err.msg) : null}
                  </form>
                ) : (
                  <Link to={`/folder/${folder.id}`}>{folder.folderName}</Link>
                )}
                <button onClick={() => setIsEditingFolder(true)}>Edit</button>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
