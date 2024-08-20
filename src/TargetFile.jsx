import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DeleteFileModal from './DeleteFileModal.';

function File() {
  const [targetFile, setTargetFile] = useState({});
  const [folderOfTargetFile, setFolderOfTargetFile] = useState({});
  const [isDeletingFile, setIsDeletingFile] = useState();

  const navigate = useNavigate();
  const { fileId } = useParams();

  useEffect(() => {
    async function getTargetFile() {
      try {
        const response = await fetch(`http://localhost:3000/files/${fileId}`, {
          credentials: 'include',
        });
        if (response.status === 401) navigate('/login');
        if (!response.ok)
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );

        const responseData = await response.json();
        setTargetFile(responseData);
        setFolderOfTargetFile(responseData.folder);
      } catch (err) {
        console.error(err);
      }
    }
    getTargetFile();
  }, [fileId]);

  return (
    <>
      <h2>
        Folders {'>'}{' '}
        <Link to={`/folder/${folderOfTargetFile.id}`}>
          {folderOfTargetFile.folderName}
        </Link>
      </h2>
      {isDeletingFile ? (
        <DeleteFileModal
          fileId={fileId}
          targetFile={targetFile}
          isDeletingFile={isDeletingFile}
          setIsDeletingFile={setIsDeletingFile}
          folderOfTargetFile={folderOfTargetFile}
        />
      ) : null}
      {targetFile.user && (
        <>
          <h3>{targetFile.fileName}</h3>
          <p>
            Created by: {targetFile.user.username} on {targetFile.createdAt}
          </p>
          <button>Download File</button>
          {/* link the button download to pathname? */}
          <button>Edit File</button>
          <button
            type='button'
            onClick={() => {
              setIsDeletingFile(true);
            }}>
            Delete File
          </button>
        </>
      )}
    </>
  );
}

export default File;
