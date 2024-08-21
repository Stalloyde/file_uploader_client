import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DeleteFileModal from './DeleteFileModal.';
import EditFile from './EditFile';

function File() {
  const [targetFile, setTargetFile] = useState({});
  const [folderOfTargetFile, setFolderOfTargetFile] = useState({});
  const [isDeletingFile, setIsDeletingFile] = useState(false);
  const [isEditingFile, setIsEditingFile] = useState(false);

  const navigate = useNavigate();
  const { fileId } = useParams();

  useEffect(() => {
    async function getTargetFile() {
      try {
        const response = await fetch(`http://localhost:3000/file/${fileId}`, {
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
  }, [fileId, isEditingFile]);

  function handleInput() {
    setIsEditingFile(!isEditingFile);
  }

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
      {targetFile.user && isEditingFile ? (
        <>
          <EditFile
            handleInput={handleInput}
            fileId={fileId}
            targetFile={targetFile}
          />
          <img src={targetFile.filePath} alt='target-file' height='200px' />
        </>
      ) : (
        <>
          <h3>{targetFile.fileName}</h3>
          <p>Created on {targetFile.createdAt}</p>
          <button>
            <a
              href={`${targetFile.filePath}?fl_attachment=${targetFile.fileName}`}
              target='_blank'
              rel='noreferrer'>
              Download File
            </a>
          </button>
          <button type='button' onClick={handleInput}>
            Edit File
          </button>
          <button
            type='button'
            onClick={() => {
              setIsDeletingFile(true);
            }}>
            Delete File
          </button>
          <img src={targetFile.filePath} alt='target-file' height='200px' />
        </>
      )}
    </>
  );
}

export default File;
