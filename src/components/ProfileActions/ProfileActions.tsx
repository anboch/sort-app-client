import { Button, Link, Typography } from '@mui/material';
import React from 'react';
import { IUser } from '../../api/api.interface';
import { useLogout } from '../../hooks';
import * as S from './ProfileActionsStyles';

interface IProfileActionsProps {
  userData: IUser;
}

export const ProfileActions = ({ userData }: IProfileActionsProps): JSX.Element => {
  const { logout } = useLogout();

  return (
    <S.ProfileActions>
      ProfileActions
      <div><Button onClick={async () => { await logout(); }}>logout</Button></div>
    </S.ProfileActions>
  );
};
