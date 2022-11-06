import { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { useGetBins } from '../../hooks/useGetBins';
import { IBin, IRecyclePoint } from '../../api/api.interface';
import { Link, ListItemText, Typography } from '@mui/material';
import { useGetRecyclePoints } from '../../hooks/useGetRecyclePoints';
import { useFindBinsForRecyclePoints } from '../../hooks/useFindBinsForRecyclePoints';
import * as S from './MyRecyclePointsStyles'
import { Map } from '../../components/Map/Map';


const RecyclePointInfo = ({ recyclePoint }: { recyclePoint: IRecyclePoint | null }): JSX.Element => {

  return (
    <>
      {recyclePoint &&
        <>
          <Typography variant="caption" >
            title
          </Typography>
          <Typography variant="h6" >
            {recyclePoint?.title}
          </Typography>
          <Typography variant="caption" >
            description
          </Typography>
          <Typography variant="h6" >
            {recyclePoint?.description}
          </Typography>
          <Typography variant="caption" >
            contacts
          </Typography>
          <Link
            display='block'
            target="_blank"
            href={recyclePoint?.contacts?.site}
            rel="noopener noreferrer"
            variant="h6" >
            {recyclePoint?.contacts?.site}
          </Link>
        </>}
    </>
  )
}


const SuitableBinList = ({ bins }: { bins: IBin[] | null }): JSX.Element => {
  return (
    <>
      <Typography variant="caption" >
        bins
      </Typography>
      {bins &&
        bins.map(bin => {
          return (<ListItemText key={bin._id} secondary={`- ${bin.title}`} />);
        })
      }
    </>
  )
}


export const MyRecyclePoints = (): JSX.Element => {
  const [selectedRecyclePoint, setSelectedRecyclePoint] = useState<IRecyclePoint | null>(null);
  const binsQ = useGetBins();
  const { allRecyclePointsIds, binsForRecyclePoints } = useFindBinsForRecyclePoints(binsQ.data)
  const recyclePointsQ = useGetRecyclePoints((allRecyclePointsIds));

  const handlMarkerClick = (newRecyclePoint: IRecyclePoint): void => {
    setSelectedRecyclePoint((prevState) => {
      if (prevState?._id === newRecyclePoint._id) {
        return null;
      }
      return newRecyclePoint;
    });
  };

  const style = {
    padding: '3px',
    color: '#fff',
    cursor: 'pointer',
    background: '#19c850',
    borderRadius: '6px'
  };


  return (
    <S.MyRecyclePoints>
      <div>
        <RecyclePointInfo recyclePoint={selectedRecyclePoint} />
        <SuitableBinList bins={selectedRecyclePoint ? binsForRecyclePoints[selectedRecyclePoint._id] : null} />
      </div>
      <Map
      >
        {recyclePointsQ.data && binsQ.data &&
          recyclePointsQ.data.map(recyclePoint => {
            return (
              <Marker
                key={recyclePoint._id}
                latitude={recyclePoint?.position?.coordinates.latitude ?? null}
                longitude={recyclePoint?.position?.coordinates.longitude ?? null}
                onClick={() => handlMarkerClick(recyclePoint)}
              >
                <div style={style}>
                  {recyclePoint._id !== selectedRecyclePoint?._id ?
                    (<Typography>
                      {`${binsForRecyclePoints[recyclePoint._id].length} from ${binsQ.data.length} bins`}
                    </Typography>)
                    :
                    (<>
                      {binsForRecyclePoints[recyclePoint._id].map(bin => {
                        return (<ListItemText key={bin._id} secondary={`- ${bin.title}`} />);
                      })}
                    </>)
                  }
                </div>
              </Marker>
            );
          })
        }
      </Map>
    </S.MyRecyclePoints>);
};