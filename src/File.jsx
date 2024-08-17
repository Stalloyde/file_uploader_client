import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function File() {
  const [targetFile, setTargetFile] = useState({});
  const navigate = useNavigate();
  const { fileId } = useParams();

  useEffect(() => {
    async function getTargetFolderAndFiles() {
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
    }
    getTargetFolderAndFiles();
  }, [fileId]);

  return (
    <>
      {targetFile.user && (
        <>
          <h2>{targetFile.fileName}</h2>
          <p>
            Created by: {targetFile.user.username} on {targetFile.createdAt}
          </p>
          <button>Download File</button>
          {/* link the button download to pathname? */}
        </>
      )}
    </>
  );
}

export default File;
