import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';

DeleteFileModal.propTypes = {
  fileId: PropTypes.string,
  targetFile: PropTypes.object,
  setIsDeletingFile: PropTypes.func,
  folderOfTargetFile: PropTypes.object,
};

function DeleteFileModal({
  fileId,
  targetFile,
  setIsDeletingFile,
  folderOfTargetFile,
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  async function deleteFile() {
    try {
      const response = await fetch(
        `https://stalloyde-file-uploader-api.adaptable.app/file/${fileId}/delete`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          credentials: 'include',
          body: JSON.stringify({ fileId }),
          mode: 'cors',
        },
      );
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      setOpen(false);
      setIsDeletingFile(false);
      navigate(`/folder/${folderOfTargetFile.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  const handleClose = () => {
    setIsDeletingFile(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        <DialogContent>
          <DialogContentText>
            <strong>
              Are you sure you want to delete the file '{targetFile.fileName}'?
            </strong>
          </DialogContentText>
          <DialogContentText>
            This action is permanent and cannot be reversed.
          </DialogContentText>

          <div>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={deleteFile}>Yes</button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default DeleteFileModal;
