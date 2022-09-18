import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useEffect, useState } from 'react';
import { LoginFormContext } from '../../context/LoginFormContext';
import { api } from '../../api';
import * as S from './LoginFormStyles';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress, Link } from '@mui/material';
import { useCountdown, useConfirmAndLogin, useGetUser } from '../../hooks';
import { responseErrorMessages } from '../../api/api.constants';
// import { UserContext } from '../../context/UserContext';



export const LoginForm = (): JSX.Element => {
  const { isOpen, setIsOpen } = useContext(LoginFormContext);
  // const { injectUser } = useContext(UserContext);
  const userQ = useGetUser();
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputCodeValue, setInputCodeValue] = useState('');
  const [confirmFor, setConfirmFor] = useState<string>('');
  const [isWrongFormat, setIsWrongFormat] = useState(false);
  const [isWrongCode, setIsWrongCode] = useState('');
  const requestConfirmCodeQ = useQuery(['requestConfirm', confirmFor], () => api.requestConfirmCode(confirmFor), {
    retry: false,
    enabled: !!confirmFor,
    staleTime: Infinity,
    cacheTime: Infinity
  });
  const confirmAndLoginQ = useConfirmAndLogin({ email: requestConfirmCodeQ.data?.data.email ?? '', confirmCode: inputCodeValue });
  const { countdown, setCountdown } = useCountdown(requestConfirmCodeQ.data?.data.codeExpirationTime ?? 0);

  const validateAndSetEmail = () => {
    // eslint-disable-next-line no-useless-escape
    const isValidEmail = inputEmailValue.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (isValidEmail) {
      setConfirmFor(inputEmailValue);
    } else {
      setIsWrongFormat(true);
    }
  };

  // useEffect(() => {
  //   console.log('confirmFor:', confirmFor);
  //   async function requestConfirmCode(): Promise<void> {
  //     if (confirmFor) {
  //       console.log('confirmFor:', confirmFor);
  //       await requestConfirmCodeQ.refetch();
  //     }
  //   }
  //   requestConfirmCode();
  // }, [confirmFor]);

  useEffect(() => {
    setIsWrongFormat(false);
  }, [inputEmailValue]);

  useEffect(() => {
    // todo add success sign
    if (confirmAndLoginQ.isSuccess) {
      confirmAndLoginQ.remove();

      (async (): Promise<void> => {
        // await injectUser()
        await userQ.refetch();
      })()
      handleClose()
    }

  }, [confirmAndLoginQ.isSuccess]);

  useEffect(() => {
    if (countdown?.raw === 0) {
      setInputCodeValue('');
      setConfirmFor('');
      setCountdown(null);
      requestConfirmCodeQ.remove()
    }
  }, [countdown]);


  useEffect(() => {
    if (inputCodeValue.length === 6) {
      (async (): Promise<void> => {
        await confirmAndLoginQ.refetch();
      })()
    }
  }, [inputCodeValue]);



  useEffect(() => {
    const errorMessage = confirmAndLoginQ.error?.response?.data.message;
    if (errorMessage === responseErrorMessages.WRONG_CODE || errorMessage === responseErrorMessages.CODE_EXPIRED) {
      setIsWrongCode(errorMessage);
    }
  }, [confirmAndLoginQ.error?.response?.data.message]);

  useEffect(() => {
    setIsWrongCode('');
  }, [inputCodeValue]);

  const handleClose = () => {
    setIsOpen(false);
    setInputEmailValue('');
    setInputCodeValue('');
    setConfirmFor('');
    setCountdown(null);
    requestConfirmCodeQ.remove()
    // setInputEmailValue('');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {/* <div>
        {data ? (
          <>
            data-----------------
          </>
        ) : (
          isError ? (
            <span>Error: ------------------------</span>
          ) : (
            (isLoading && !isFetching) ? (
              <span>Not ready ...</span>
            ) : (
              <span>Loading...</span>
            )
          )
        )}

        <div>{isFetching ? 'Fetching...' : null}</div>
      </div> */}
      {(requestConfirmCodeQ.isFetching || confirmAndLoginQ.isFetching) &&
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>}
      {
        !confirmFor &&
        // todo redo to  visibility: hidden;
        !requestConfirmCodeQ.isFetching &&
        !requestConfirmCodeQ.isError &&
        <S.RequestForm>
          <DialogTitle>Sign in by email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              We will send you an email with a code. You can use it to login or register an account
            </DialogContentText>
            {/* {timeDelta && <div>
                <p>{timeDelta.minutes}</p>
                <p>{timeDelta.seconds}</p>
              </div>} */}
            <TextField
              value={inputEmailValue}
              onChange={(e): void => setInputEmailValue(e.target.value)}
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              error={isWrongFormat}
              helperText={isWrongFormat ? 'Wrong format' : null}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={validateAndSetEmail}>Get the code</Button>
          </DialogActions>
        </S.RequestForm>
      }
      {
        !!confirmFor &&
        // todo redo to  visibility: hidden;
        !requestConfirmCodeQ.isFetching &&
        !requestConfirmCodeQ.isError &&
        <S.ConfirmForm>
          <DialogTitle>Enter the code</DialogTitle>
          <DialogContent>
            <DialogContentText>
              We've sent a verification code to the email {confirmFor}
              <Link
                href="#"
                variant="inherit"
                underline="none"
                onClick={() => {
                  setConfirmFor('');
                  setInputCodeValue('');
                  setCountdown(null);
                  requestConfirmCodeQ.remove()
                }}>
                Edit
              </Link>
            </DialogContentText>
            {/* {timeDelta && <div>
                <p>{timeDelta.minutes}</p>
                <p>{timeDelta.seconds}</p>
              </div>} */}
            <TextField
              // todo center input text
              value={inputCodeValue}
              onChange={(e): void => {
                const cleanValue = e.target.value.replace(/\D/g, '');
                if (cleanValue.length <= 6) {
                  setInputCodeValue(cleanValue);
                }
              }}
              autoFocus
              margin="dense"
              label="six digits"
              type='search'
              autoComplete='off'
              // inputMode='numeric'
              fullWidth
              // variant="standard"
              disabled={confirmAndLoginQ.isFetching}
              error={!!isWrongCode}
              helperText={isWrongCode}
            />
            {countdown && countdown.raw !== 0 &&
              <DialogContentText>
                You can get a new code in {countdown.minutes}:{countdown.seconds}
              </DialogContentText>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {/* {countdown?.raw === 0 &&
              <Button
                size='small'
                onClick={async () => {
                  setInputCodeValue('');
                  await requestConfirmCodeQ.refetch();
                }}>
                Get a new code
              </Button>} */}
          </DialogActions>
        </S.ConfirmForm>
      }
    </Dialog >
  );
};
