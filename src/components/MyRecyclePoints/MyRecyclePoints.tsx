import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useGetBins } from '../../hooks/useGetBins';
import { IBin, IRecyclePoint } from '../../api/api.interface';
import { Divider, Link, ListItemText, Typography } from '@mui/material';
import { useGetRecyclePoints } from '../../hooks/useGetRecyclePoints';
import { useFindBinsForRecyclePoints } from '../../hooks/useFindBinsForRecyclePoints';
import * as S from './MyRecyclePointsStyles';
import { Map } from '../Map/Map';
import { pageRoutes } from '../../routes';
import { RecyclePointMarker } from '../RecyclePointMarker/RecyclePointMarker';
import { PopperContainer } from '../PopperContainer/PopperContainer';

export const RecyclePointInfo = ({
  recyclePoint,
}: {
  recyclePoint: IRecyclePoint | null;
}): JSX.Element => {
  return (
    <>
      {recyclePoint && (
        <div>
          <Typography variant="caption">название пункта</Typography>
          <Typography>{recyclePoint?.title}</Typography>
          <Typography variant="caption">описание</Typography>
          <Typography>{recyclePoint?.description}</Typography>
          <Typography variant="caption">контакты</Typography>
          <Link
            display="block"
            target="_blank"
            href={recyclePoint?.contacts?.site}
            rel="noopener noreferrer"
          >
            {recyclePoint?.contacts?.site}
          </Link>
        </div>
      )}
    </>
  );
};

const SuitableBinList = ({ bins }: { bins: IBin[] | null }): JSX.Element => {
  return (
    <>
      <Typography variant="caption">принимаемые корзины</Typography>
      {bins &&
        bins.map((bin) => {
          return <ListItemText key={bin._id} primary={`- ${bin.title}`} />;
        })}
    </>
  );
};

export const MyRecyclePoints = (): JSX.Element => {
  const [selectedRecyclePoint, setSelectedRecyclePoint] = useState<IRecyclePoint | null>(null);
  const [withOpenedInfo, setWithOpenedInfo] = useState<HTMLElement | null>(null);
  const binsQ = useGetBins();
  const { allRecyclePointsIds, binsForRecyclePoints } = useFindBinsForRecyclePoints(binsQ.data);
  const recyclePointsQ = useGetRecyclePoints(allRecyclePointsIds);

  if (recyclePointsQ.data?.length === 0) {
    return (
      <S.MyRecyclePoints>
        <S.NoRecyclePointsNotice>
          <Typography display="block" variant="h6" align="center">
            У вас пока нет корзин и соответственно подходящих пунктов приёма
          </Typography>
          <S.NoRecyclePointsNoticeExplanation>
            <Typography variant="subtitle1">{'Воспользуйтесь '}</Typography>
            <Link component={RouterLink} to={pageRoutes.search}>
              поиском по материалам
            </Link>
            <Typography variant="subtitle1">{' и создайте корзину'}</Typography>
          </S.NoRecyclePointsNoticeExplanation>
        </S.NoRecyclePointsNotice>
      </S.MyRecyclePoints>
    );
  }

  return (
    <S.MyRecyclePoints>
      <Map>
        <PopperContainer
          withOpenedInfo={withOpenedInfo}
          selectedRecyclePoint={selectedRecyclePoint}
          setWithOpenedInfo={setWithOpenedInfo}
        >
          <div>
            <SuitableBinList
              bins={selectedRecyclePoint ? binsForRecyclePoints[selectedRecyclePoint._id] : null}
            />
            <Divider />
            <RecyclePointInfo recyclePoint={selectedRecyclePoint} />
          </div>
        </PopperContainer>
        {recyclePointsQ.data &&
          binsQ.data &&
          recyclePointsQ.data.map((recyclePoint: IRecyclePoint) => {
            return (
              <RecyclePointMarker
                key={recyclePoint._id}
                recyclePoint={recyclePoint}
                numberOfUserBins={binsQ.data.length}
                numberOfSuitableBins={binsForRecyclePoints[recyclePoint._id].length}
                setWithOpenedInfo={setWithOpenedInfo}
                setSelectedRecyclePoint={setSelectedRecyclePoint}
              />
            );
          })}
      </Map>
    </S.MyRecyclePoints>
  );
};
