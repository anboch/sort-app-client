import { Button } from '@mui/material';
import { useContext } from 'react';
import { LoginFormContext } from '../../context/LoginFormContext';

export const OfferToLogin = (): JSX.Element => {
  const { setIsOpen } = useContext(LoginFormContext);

  return (
    <>
      You need to
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        register
      </Button>
    </>
  );
};
