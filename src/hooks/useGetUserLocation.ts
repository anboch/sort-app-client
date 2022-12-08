import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICoordinates, IGeolocation } from '../api/api.interface';
import { localStorageKeys } from '../components/common/constants';
import { useGetUser } from './useGetUser';
import { useUpdateUser } from './useUpdateUser';

export const useGetUserLocation = (): {
  userCoordinates: ICoordinates | null;
  coordinatesMutationFunc: (coordinates: ICoordinates) => void;
} => {
  const [userCoordinates, setUserCoordinates] = useState<ICoordinates | null>(null);
  const userQ = useGetUser();
  const userM = useUpdateUser();
  const coordinatesMutationFunc = (coordinates: ICoordinates) => {
    if (coordinates.latitude && coordinates.longitude) {
      userM.mutate({ position: { coordinates } });
      userCoordinatesToLS(coordinates);
    }
  };

  const getGeoData = async () => {
    try {
      // todo add the api address to env
      const response = await axios.get<IGeolocation>('https://geolocation-db.com/json/');
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      // todo handle error
    }
  };

  const userCoordinatesToLS = (userCoordinates: ICoordinates): void => {
    localStorage.setItem(localStorageKeys.userCoordinates, JSON.stringify(userCoordinates));
  };

  useEffect(() => {
    const coordinatesFromLS: ICoordinates = JSON.parse(
      localStorage.getItem(localStorageKeys.userCoordinates) ?? 'null',
      (key, value) => {
        if (typeof value === 'object' && key === '') {
          return value;
        }
        return typeof value === 'number' ? value : null;
      }
    );
    let newUserCoordinates = {} as ICoordinates;

    (async (): Promise<void> => {
      if (!userQ.data) {
        if (coordinatesFromLS) {
          newUserCoordinates = coordinatesFromLS;
        } else {
          const geoData = await getGeoData();
          if (geoData?.latitude && geoData?.longitude) {
            newUserCoordinates = { latitude: geoData.latitude, longitude: geoData.longitude };
            userCoordinatesToLS(newUserCoordinates);
          }
        }
      } else if (userQ.data.position?.coordinates) {
        newUserCoordinates = userQ.data.position?.coordinates;
        if (!coordinatesFromLS) {
          userCoordinatesToLS(newUserCoordinates);
        }
      } else {
        if (coordinatesFromLS) {
          newUserCoordinates = coordinatesFromLS;
        } else {
          const geoData = await getGeoData();
          if (geoData?.latitude && geoData?.longitude) {
            newUserCoordinates = { latitude: geoData.latitude, longitude: geoData.longitude };
            userCoordinatesToLS(newUserCoordinates);
          }
        }
        coordinatesMutationFunc(newUserCoordinates);
      }

      if (newUserCoordinates.latitude && newUserCoordinates.longitude) {
        setUserCoordinates(newUserCoordinates);
      } else {
        localStorage.removeItem(localStorageKeys.userCoordinates);
      }
    })();
  }, [userQ.data]);

  return { userCoordinates, coordinatesMutationFunc };
};
