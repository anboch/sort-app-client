import CircularProgress from '@mui/material/CircularProgress';
import * as S from './LoadingSpinnerStyles';

export const LoadingSpinner = (): JSX.Element => {
  return (
    <S.LoadingSpinner>
      <CircularProgress />
    </S.LoadingSpinner>
  );
};
