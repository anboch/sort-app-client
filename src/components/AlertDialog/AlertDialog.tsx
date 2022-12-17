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
}): JSX.Element => {
  const handleClose = (): void => {
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
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Нет
        </Button>
        <Button color="warning" onClick={action} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
