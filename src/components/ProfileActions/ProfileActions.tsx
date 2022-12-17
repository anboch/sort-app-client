import { Button } from '@mui/material';
import { useState } from 'react';
import { IUser } from '../../api/api.interface';
import { useLogout } from '../../hooks/useLogout';
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

  const deleteAccount = (): void => deleteUserM.mutate(userData._id);
  const deleteAlertMessage = 'Вы действительно хотите удалить аккаунт?';

  const handleDeleteClick = (): void => {
    setIsAlertOpen(true);
    // todo add success sign
  };

  return (
    <S.ProfileActions>
      <Button onClick={handleDeleteClick}>Удалить аккаунт</Button>
      <Button onClick={async (): Promise<void> => await logout()}>Выйти из аккаунта</Button>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={deleteAlertMessage}
        action={deleteAccount}
      />
    </S.ProfileActions>
  );
};
