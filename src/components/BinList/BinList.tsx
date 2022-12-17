import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import * as S from './BinListStyles';
import { Bin } from '../Bin/Bin';
import { useGetBins } from '../../hooks/useGetBins';
import { pageRoutes } from '../../routes';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const BinList = (): JSX.Element => {
  // todo. request by one bin to prevent rerender of all bins when edit one
  const binsQ = useGetBins();

  if (binsQ.isError) {
    // todo handle error
    return <>Error</>;
  }
  if (binsQ.isLoading && binsQ.isFetching) {
    return <LoadingSpinner />;
  }
  if (binsQ.data?.length === 0) {
    return (
      <S.BinList>
        <S.NoBinNotice>
          <Typography display="block" variant="h6" align="center">
            У Вас пока нет корзин
          </Typography>
          <S.NoBinNoticeExplanation>
            <Typography variant="subtitle1">{'Воспользуйтесь '}</Typography>
            <Link component={RouterLink} to={pageRoutes.search}>
              поиском по материалам
            </Link>
            <Typography variant="subtitle1">
              {' и в зависимости от удобного пункта приёма создайте подходящую'}
            </Typography>
          </S.NoBinNoticeExplanation>
        </S.NoBinNotice>
      </S.BinList>
    );
  }
  return (
    <S.BinList>
      {binsQ.data?.map((bin) => (
        <Bin key={bin._id} bin={bin} />
      ))}
    </S.BinList>
  );
};
