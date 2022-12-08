import { Collapse, Button, Typography, IconButton, Divider } from '@mui/material';
import { Marker } from '@urbica/react-map-gl';
import { IUser } from '../../api/api.interface';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { ProfileActions } from '../ProfileActions/ProfileActions';
import { EditableValue } from '../common/EditableValue';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import * as S from './ProfileStyles';
import { useEffect, useState } from 'react';
import { IViewportSettings, mapCommonSettings, MapGLWrap } from '../MapGLWrap/MapGLWrap';
import { useGetUserLocation } from '../../hooks/useGetUserLocation';

interface IProfileProps {
  userData: IUser;
}

const ProfilePropertyItem = ({
  propertyTitle,
  property,
}: {
  propertyTitle: string;
  property: string;
}) => {
  return (
    <div>
      <Typography variant="caption">{propertyTitle}</Typography>
      <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="subtitle1">
        {property}
      </Typography>
    </div>
  );
};

const UserGeoLocation = (): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [viewport, setViewport] = useState<IViewportSettings>(mapCommonSettings.defaultViewport);
  const [isCoordsChanged, setIsCoordsChanged] = useState<boolean>(false);
  const { userCoordinates, coordinatesMutationFunc } = useGetUserLocation();

  const saveNewUserLocation = () => {
    if (isCoordsChanged) {
      coordinatesMutationFunc({
        latitude: +viewport.latitude.toFixed(6),
        longitude: +viewport.longitude.toFixed(6),
      });
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    setIsCoordsChanged(
      viewport.latitude !== userCoordinates?.latitude ||
        viewport.longitude !== userCoordinates?.longitude
    );
  }, [viewport]);

  useEffect(() => {
    if (!isExpanded && userCoordinates) {
      setViewport(({ zoom }) => {
        return { zoom, ...userCoordinates };
      });
    }
  }, [isExpanded]);

  return (
    <S.UserGeoLocation>
      <Typography variant="caption">местоположение</Typography>
      <S.UserGeoLocationExpand isExpanded={isExpanded}>
        {!isExpanded ? (
          <Button
            onClick={(): void => setIsExpanded((prev) => !prev)}
            size="small"
            variant="outlined"
            aria-label="show more"
          >
            Показать на карте
          </Button>
        ) : (
          <>
            {isCoordsChanged && (
              <IconButton onClick={saveNewUserLocation}>
                <SaveIcon />
              </IconButton>
            )}
            <IconButton onClick={() => setIsExpanded(false)}>
              <CloseIcon />
            </IconButton>
          </>
        )}
      </S.UserGeoLocationExpand>
      {isExpanded && (
        <Typography sx={{ opacity: isCoordsChanged ? 0 : 1 }} color="info.main" variant="subtitle2">
          Перемещайте карту, чтобы изменить положение
        </Typography>
      )}
      <Collapse in={isExpanded} timeout="auto">
        <S.UserGeoLocationMap>
          <MapGLWrap mapHight={'60vh'} viewport={viewport} setViewport={setViewport}>
            <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
              <PersonPinCircleRoundedIcon fontSize="large" color="primary" />
            </Marker>
          </MapGLWrap>
        </S.UserGeoLocationMap>
      </Collapse>
    </S.UserGeoLocation>
  );
};

export const Profile = ({ userData }: IProfileProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(userData.name ?? '');
  const userM = useUpdateUser();
  const nameMutationFunc = (inputValue: string) => userM.mutate({ name: inputValue });
  return (
    <S.Profile>
      <Typography sx={{ display: 'flex', justifyContent: 'end' }} variant="subtitle1">
        профиль
      </Typography>
      <EditableValue
        inputValue={inputValue}
        setInputValue={setInputValue}
        currentValue={userData.name}
        mutationFunc={nameMutationFunc}
        title={'имя'}
      />
      {userData.email && <ProfilePropertyItem propertyTitle="email" property={userData.email} />}
      <UserGeoLocation />
      <Divider />
      <ProfileActions userData={userData} />
    </S.Profile>
  );
};
