import { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export const AlertDialog = ({
  isOpen,
  setIsOpen,
  message,
  action,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  action: () => void;
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
      <DialogActions>
        <Button onClick={handleClose}>Нет</Button>
        <Button onClick={action} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
