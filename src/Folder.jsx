import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function Folder() {
  const [filesInTargetFolder, setFilesInTargetFolder] = useState([]);
  const [targetFolder, setTargetFolder] = useState({});
  const navigate = useNavigate();
  const targetFolderId = useParams();

  useEffect(() => {
    async function getTargetFolderAndFiles() {
      const response = await fetch(
        `http://localhost:3000/folders/${targetFolderId.folderId}`,
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
    }

    getTargetFolderAndFiles();
  }, [targetFolderId]);

  return (
    <>
      <h2>
        Folders {'>'} {targetFolder.folderName}
      </h2>
      <ul>
        {filesInTargetFolder.map((file) => (
          <li key={file.id} id={file.id}>
            <Link to={`/folder/${targetFolderId.folderId}/${file.id}`}>
              {file.fileName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Folder;
