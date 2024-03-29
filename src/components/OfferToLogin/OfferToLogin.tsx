import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import * as S from './OfferToLoginStyles';
import { LoginFormContext } from '../../context/LoginFormContext';

export const OfferToLogin = ({ sectionTitle = '' }: { sectionTitle?: string }): JSX.Element => {
  const { setIsOpen } = useContext(LoginFormContext);

  return (
    <S.OfferToLogin>
      <Typography>
        Для просмотра {sectionTitle ? '' : ' данного '} раздела <b> {sectionTitle} </b> необходимо
      </Typography>
      <Button
        variant="outlined"
        onClick={(): void => {
          setIsOpen(true);
        }}
      >
        войти / зарегистрироваться
      </Button>
    </S.OfferToLogin>
  );
};
