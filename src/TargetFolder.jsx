import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UploadNewFile from './UploadNewFile';

function Folder() {
  const [filesInTargetFolder, setFilesInTargetFolder] = useState([]);
  const [targetFolder, setTargetFolder] = useState({});

  const navigate = useNavigate();
  const { folderId } = useParams();

  async function getTargetFolderAndFiles() {
    try {
      const response = await fetch(
        `http://localhost:3000/folders/${folderId}`,
        {
          credentials: 'include',
        },
      );
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();

      setFilesInTargetFolder(responseData.filesInTargetFolder);
      setTargetFolder(responseData.targetFolder);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTargetFolderAndFiles();
  }, [folderId]);

  return (
    <>
      <div>
        <h2>
          Folders {'>'} {targetFolder.folderName}
        </h2>
      </div>
      <UploadNewFile getTargetFolderAndFiles={getTargetFolderAndFiles} />
      <ul>
        {filesInTargetFolder.map((file) => (
          <li key={file.id} id={file.id}>
            <Link to={`/folder/${folderId}/${file.id}`}>{file.fileName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Folder;
