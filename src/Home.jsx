import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Layout() {
  const [allFiles, setAllFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllFiles() {
      const response = await fetch('http://localhost:3000/files', {
        credentials: 'include',
      });
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();
      setAllFiles(responseData);
    }

    getAllFiles();
  }, []);

  return (
    <>
      <main>
        <h2>Folders {'>'} All Files</h2>
        <button>Upload New File</button>

        <ul>
          {allFiles.map((file) => (
            <li key={file.id} id={file.id}>
              <Link to={`/file/${file.id}`}>{file.fileName}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Layout;
