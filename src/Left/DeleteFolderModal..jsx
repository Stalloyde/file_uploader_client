import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';

DeleteFolderModal.propTypes = {
  getAllFolders: PropTypes.func,
  allFolders: PropTypes.array,
  targetInput: PropTypes.number,
  setIsDeletingFolder: PropTypes.func,
  handleInputStates: PropTypes.func,
};

function DeleteFolderModal({
  getAllFolders,
  allFolders,
  targetInput,
  setIsDeletingFolder,
  handleInputStates,
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const targetFolder = allFolders.find((folder) => folder.id === targetInput);

  async function deleteFolder(e) {
    try {
      const response = await fetch(
        'https://file-uploader-api.adaptable.app/folder/delete',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          credentials: 'include',
          body: JSON.stringify({ targetFolder }),
          mode: 'cors',
        },
      );
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      setOpen(false);
      getAllFolders();
      handleInputStates(e);
      setIsDeletingFolder(false);
      navigate('/');
      navigate(0); // Force a remount
    } catch (err) {
      console.error(err);
    }
  }

  const handleClose = (e) => {
    setIsDeletingFolder(false);
    handleInputStates(e);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        <DialogContent>
          <DialogContentText>
            <strong>
              Are you sure you want to delete the folder '
              {targetFolder.folderName}'?
            </strong>
          </DialogContentText>
          <DialogContentText>
            All associated files will also be deleted. This action cannot be
            reversed.
          </DialogContentText>

          <div>
            <button onClick={(e) => handleClose(e)}>Cancel</button>
            <button onClick={(e) => deleteFolder(e)}>Yes</button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default DeleteFolderModal;
