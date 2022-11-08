import { Button, ButtonGroup } from '@mui/material';
import { useContext, useState } from 'react';
import { IUser } from '../../api/api.interface';
import { ThemeContext, themeModeTypes } from '../../context/ThemeContex/ThemeContext';
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
  const { themeMode, toggleThemeMode } = useContext(ThemeContext);

  const deleteAccount = () => deleteUserM.mutate(userData._id);
  const deleteAlertMessage = 'Вы действительно хотите удалить аккаунт?';

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
    // todo add success sign
  };

  return (
    <S.ProfileActions>
      <ButtonGroup size="small" aria-label="outlined primary button group">
        <Button
          variant={themeMode === themeModeTypes.LIGHT ? 'contained' : undefined}
          onClick={() => toggleThemeMode(themeModeTypes.LIGHT)}
        >
          Светлая
        </Button>
        <Button
          variant={themeMode === themeModeTypes.AUTO ? 'contained' : undefined}
          onClick={() => toggleThemeMode(themeModeTypes.AUTO)}
        >
          Авто
        </Button>
        <Button
          variant={themeMode === themeModeTypes.DARK ? 'contained' : undefined}
          onClick={() => toggleThemeMode(themeModeTypes.DARK)}
        >
          Тёмная
        </Button>
      </ButtonGroup>
      ProfileActions
      <div>
        <Button onClick={async () => await logout()}>Выйти</Button>
        <Button onClick={handleDeleteClick}>Удалить аккаунт</Button>
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
