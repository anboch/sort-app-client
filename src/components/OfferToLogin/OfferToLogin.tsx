import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import * as S from './OfferToLoginStyles';
import { LoginFormContext } from '../../context/LoginFormContext';

export const OfferToLogin = (): JSX.Element => {
  const { setIsOpen } = useContext(LoginFormContext);

  return (
    <S.OfferToLogin>
      <Typography>Для просмотра данного раздела необходимо</Typography>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        войти/зарегистрироваться
      </Button>
    </S.OfferToLogin>
  );
};
