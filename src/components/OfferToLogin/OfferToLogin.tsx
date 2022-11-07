import { Button } from '@mui/material';
import { useContext } from 'react';
import { LoginFormContext } from '../../context/LoginFormContext';

export const OfferToLogin = (): JSX.Element => {
  const { setIsOpen } = useContext(LoginFormContext);

  return (
    <>
      Необходимо
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        войти/зарегистрироваться
      </Button>
    </>
  );
};
