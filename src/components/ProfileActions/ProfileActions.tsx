import { Button, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IUser } from '../../api/api.interface';
import { useLogout } from '../../hooks';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { AlertDialog } from '../AlertDialog/AlertDialog';
import * as S from './ProfileActionsStyles';

interface IProfileActionsProps {
  userData: IUser;
}

export const ProfileActions = ({ userData }: IProfileActionsProps): JSX.Element => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { logout } = useLogout();
  const deleteUserM = useDeleteUser();
  const deleteAccount = () => deleteUserM.mutate(userData._id);
  const deleteAlertMessage = 'Do you want to delete the account?';

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
    // todo add success sign
  };

  return (
    <S.ProfileActions>
      ProfileActions
      <div>
        <Button onClick={async () => await logout()}>logout</Button>
        <Button onClick={handleDeleteClick}>Delete account</Button>
      </div>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={deleteAlertMessage}
        action={deleteAccount}
      />
    </S.ProfileActions>
  );
};
