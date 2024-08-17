import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

function Layout() {
  const [allFolders, setAllFolders] = useState([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const navigate = useNavigate();

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

  function handleCreatingFolderInput() {
    setIsCreatingFolder(!isCreatingFolder);
    setErrorMessage('');
  }

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
        setIsCreatingFolder(!isCreatingFolder);
        getAllFolders();
        setErrorMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <section>
        <h1>File Uploader</h1>
        <div>
          <h2>Folders</h2>
          <button onClick={handleCreatingFolderInput}>Create New Folder</button>
          {isCreatingFolder ? (
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
              <button type='button' onClick={handleCreatingFolderInput}>
                Cancel
              </button>
              {errorMessage ? errorMessage.map((err) => err.msg) : null}
            </form>
          ) : null}
          <ul>
            <li>
              <Link to='/folder'>All Folders</Link>
            </li>
            {allFolders.map((folder) => (
              <li key={folder.id} id={folder.id}>
                <Link to={`/folder/${folder.id}`}>{folder.folderName}</Link>
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
