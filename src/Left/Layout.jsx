import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import CreateNewFolder from './CreateNewFolder';
import EditFolder from './EditFolder';
import DeleteFolderModal from './DeleteFolderModal.';

function Layout() {
  const [allFolders, setAllFolders] = useState([]);
  const [targetInput, setTargetInput] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [isDeletingFolder, setIsDeletingFolder] = useState(false);

  const navigate = useNavigate();

  async function getAllFolders() {
    try {
      const response = await fetch(
        'https://stalloyde-file-uploader-api.adaptable.app/folder',
        {
          credentials: 'include',
          mode: 'cors',
        },
      );
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

  function handleInputStates(e) {
    if (e.target.id === 'create-folder') {
      setTargetInput('create-folder');
    } else if (e.target.id) {
      setTargetInput(Number(e.target.id));
    } else {
      setTargetInput();
    }
    setErrorMessage('');
  }

  return (
    <>
      <section>
        {isDeletingFolder ? (
          <DeleteFolderModal
            getAllFolders={getAllFolders}
            allFolders={allFolders}
            targetInput={targetInput}
            setTargetInput={setTargetInput}
            setIsDeletingFolder={setIsDeletingFolder}
            handleInputStates={handleInputStates}
          />
        ) : null}
        <h1>File Uploader</h1>
        <div>
          <h2>Folders</h2>
          <button id='create-folder' onClick={(e) => handleInputStates(e)}>
            Create New Folder
          </button>
          {!isDeletingFolder && targetInput === 'create-folder' ? (
            <CreateNewFolder
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              getAllFolders={getAllFolders}
              handleInputStates={handleInputStates}
            />
          ) : null}
          <ul>
            <li>
              <Link to='/folder'>All Folders</Link>
            </li>
            {allFolders.map((folder) => (
              <li key={folder.id} id={folder.id}>
                {!isDeletingFolder && targetInput === folder.id ? (
                  <EditFolder
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    getAllFolders={getAllFolders}
                    allFolders={allFolders}
                    targetInput={targetInput}
                    handleInputStates={handleInputStates}
                  />
                ) : (
                  <>
                    <Link to={`/folder/${folder.id}`}>{folder.folderName}</Link>
                    <button
                      id={folder.id}
                      onClick={(e) => handleInputStates(e)}>
                      Edit
                    </button>
                    <button
                      id={folder.id}
                      onClick={(e) => {
                        handleInputStates(e);
                        setIsDeletingFolder(true);
                      }}>
                      Delete
                    </button>
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
