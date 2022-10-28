import { Button, Link, Typography } from '@mui/material';
import React from 'react';
import { IUser } from '../../api/api.interface';
import { useLogout } from '../../hooks';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import * as S from './ProfileActionsStyles';

interface IProfileActionsProps {
  userData: IUser;
}

export const ProfileActions = ({ userData }: IProfileActionsProps): JSX.Element => {
  const { logout } = useLogout();
  const deleteUserM = useDeleteUser()

  const handleDeleteAccount = async () => {
    await deleteUserM.mutate(userData._id)
    // todo add success sign
  }

  return (
    <S.ProfileActions>
      ProfileActions
      <div>
        <Button onClick={async () => { await logout(); }}>logout</Button>
        <Button onClick={handleDeleteAccount}>Delete account</Button>
      </div>
    </S.ProfileActions>
  );
};
