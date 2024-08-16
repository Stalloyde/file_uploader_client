import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

function Layout() {
  const [allFolders, setAllFolders] = useState([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllFolders() {
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
    }

    getAllFolders();
  }, []);

  function handleCreatingFolderInput() {
    setIsCreatingFolder(!isCreatingFolder);
  }

  function createNewFolder() {
    alert('Create new folder!!'); //WIP
    setIsCreatingFolder(!isCreatingFolder);
  }

  return (
    <>
      <section>
        <h1>File Uploader</h1>
        <div>
          <h2>Folders</h2>
          <button onClick={handleCreatingFolderInput}>Create New Folder</button>
          {isCreatingFolder ? (
            <form method='POST' onSubmit={createNewFolder}>
              <input
                type='text'
                id='create-folder'
                placeholder='Name of new folder'
                required
              />

              <button type='submit'>Create</button>
              <button type='button' onClick={handleCreatingFolderInput}>
                Cancel
              </button>
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
