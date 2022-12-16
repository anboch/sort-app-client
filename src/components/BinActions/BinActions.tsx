import { Button, DialogActions } from '@mui/material';
import { useState } from 'react';

import * as S from './BinActionsStyle';
import { IBin } from '../../api/api.interface';
import { useDeleteBin } from '../../hooks/useDeleteBin';
import { AlertDialog } from '../AlertDialog/AlertDialog';

export const BinActions = ({ bin }: { bin: IBin }): JSX.Element => {
  const deleteBinM = useDeleteBin();
  const deleteBin = () => deleteBinM.mutate(bin._id);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deleteAlertMessage = bin.title
    ? `Вы действительно хотите удалить корзину с названием: ${bin.title} ?`
    : 'Вы действительно хотите удалить корзину?';

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
  };

  // todo add handleConfirmDelete with success sign

  // todo add hint to Edit button when it's disabled
  return (
    <S.BinActions>
      <DialogActions>
        <Button onClick={handleDeleteClick}>Удалить</Button>
      </DialogActions>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={deleteAlertMessage}
        action={deleteBin}
      />
    </S.BinActions>
  );
};
