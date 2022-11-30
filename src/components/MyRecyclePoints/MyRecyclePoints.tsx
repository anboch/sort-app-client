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
import { OpeningHours } from '../OpeningHours/OpeningHours';

export const RecyclePointInfo = ({
  recyclePoint,
}: {
  recyclePoint: IRecyclePoint | null;
}): JSX.Element | null => {
  if (recyclePoint) {
    return (
      <S.RecyclePointInfo>
        <div>
          <Typography variant="caption">название пункта</Typography>
          <Typography variant="subtitle1">{recyclePoint?.title}</Typography>
        </div>
        <div>
          <Typography variant="caption">режим работы</Typography>
          <OpeningHours openingHours={recyclePoint.openingHours} />
        </div>
        <Typography variant="caption">контакты</Typography>
        <Link
          // todo outsideLink component
          display="block"
          target="_blank"
          href={recyclePoint?.contacts?.site}
          rel="noopener noreferrer"
        >
          {recyclePoint?.contacts?.site}
        </Link>
        <div>
          <Typography variant="caption">описание</Typography>
          <Typography variant="subtitle1">{recyclePoint?.description}</Typography>
        </div>
      </S.RecyclePointInfo>
    );
  }
  return null;
};

const SuitableBinList = ({ bins }: { bins: IBin[] | null }): JSX.Element | null => {
  if (bins && bins.length) {
    return (
      <S.SuitableBinList>
        <Typography variant="caption">принимаемые корзины</Typography>
        {bins &&
          bins.map((bin) => {
            return <ListItemText key={bin._id} primary={`- ${bin.title}`} />;
          })}
      </S.SuitableBinList>
    );
  }
  return null;
};

export const MyRecyclePoints = (): JSX.Element => {
  const [selectedRecyclePoint, setSelectedRecyclePoint] = useState<IRecyclePoint | null>(null);
  const [withOpenedInfo, setWithOpenedInfo] = useState<HTMLElement | null>(null);
  const binsQ = useGetBins();
  const { allRecyclePointsIds, binsForRecyclePoints } = useFindBinsForRecyclePoints(binsQ.data);
  const recyclePointsQ = useGetRecyclePoints(allRecyclePointsIds);

  if (binsQ.data?.length === 0) {
    return (
      <S.MyRecyclePoints>
        <S.NoRecyclePointsNotice>
          <Typography display="block" variant="h6" align="center">
            У Вас пока нет корзин и соответственно подходящих пунктов приёма
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
      <Map mapHight={'80vh'}>
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
