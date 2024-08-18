import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import CreateNewFolder from './CreateNewFolder';
import EditFolder from './EditFolder';

function Layout() {
  const [allFolders, setAllFolders] = useState([]);
  const [targetInput, setTargetInput] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);

  const navigate = useNavigate();

  function handleFolderInput(e) {
    if (e.target.id === 'create-folder') {
      setTargetInput(e.target.id);
    } else if (e.target.id) {
      setTargetInput(Number(e.target.id));
    } else {
      setTargetInput('');
    }
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
          <button id='create-folder' onClick={(e) => handleFolderInput(e)}>
            Create New Folder
          </button>
          {targetInput === 'create-folder' ? (
            <CreateNewFolder
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              getAllFolders={getAllFolders}
              targetInput={targetInput}
              setTargetInput={setTargetInput}
              handleFolderInput={handleFolderInput}
            />
          ) : null}
          <ul>
            <li>
              <Link to='/folder'>All Folders</Link>
            </li>
            {allFolders.map((folder) => (
              <li key={folder.id} id={folder.id}>
                {targetInput === folder.id ? (
                  <EditFolder
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    getAllFolders={getAllFolders}
                    allFolders={allFolders}
                    targetInput={targetInput}
                    handleFolderInput={handleFolderInput}
                  />
                ) : (
                  <>
                    <Link to={`/folder/${folder.id}`}>{folder.folderName}</Link>
                    <button
                      id={folder.id}
                      onClick={(e) => handleFolderInput(e)}>
                      Edit
                    </button>
                    <button>Delete</button>
                  </>
                )}
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
