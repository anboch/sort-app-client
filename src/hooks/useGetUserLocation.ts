import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';
import { ICoordinates, IGeolocation } from '../api/api.interface';
import { localStorageKeys } from '../components/common/constants';
import { useGetUser } from './useGetUser';
import { useUpdateUser } from './useUpdateUser';

export const useGetUserLocation = (): {
  userCoordinates: ICoordinates | null;
  coordinatesMutationFunc: (coordinates: ICoordinates) => void;
} => {
  const [userCoordinates, setUserCoordinates] = useState<ICoordinates | null>(
    getUserCoordinatesFromLS()
  );
  const userQ = useGetUser();
  const userM = useUpdateUser();
  const coordinatesMutationFunc = (coordinates: ICoordinates): void => {
    if (coordinates.latitude && coordinates.longitude) {
      userM.mutate({ position: { coordinates } });
      userCoordinatesToLS(coordinates);
    }
  };

  function getUserCoordinatesFromLS(): ICoordinates {
    return JSON.parse(
      localStorage.getItem(localStorageKeys.userCoordinates) ?? 'null',
      (key, value) => {
        if (typeof value === 'object' && key === '') {
          return value;
        }
        return typeof value === 'number' ? value : null;
      }
    );
  }

  const getGeoData = async (source: CancelTokenSource): Promise<IGeolocation | undefined> => {
    try {
      // todo add the api address to env
      const response = await axios.get<IGeolocation>('https://geolocation-db.com/json/', {
        cancelToken: source.token,
      });
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
    let isCanceled = false;
    const source = axios.CancelToken.source();
    const coordinatesFromLS: ICoordinates = getUserCoordinatesFromLS();
    let newUserCoordinates = {} as ICoordinates;

    (async (): Promise<void> => {
      if (!userQ.data) {
        if (coordinatesFromLS) {
          newUserCoordinates = coordinatesFromLS;
        } else {
          const geoData = await getGeoData(source);
          if (isCanceled) {
            return;
          }
          if (geoData?.latitude && geoData?.longitude) {
            newUserCoordinates = { latitude: geoData.latitude, longitude: geoData.longitude };
            userCoordinatesToLS(newUserCoordinates);
          }
        }
      } else if (userQ.data.position?.coordinates) {
        newUserCoordinates = userQ.data.position?.coordinates;
        if (
          !coordinatesFromLS ||
          coordinatesFromLS?.latitude !== newUserCoordinates.latitude ||
          coordinatesFromLS?.longitude !== newUserCoordinates.longitude
        ) {
          userCoordinatesToLS(newUserCoordinates);
        }
      } else {
        if (coordinatesFromLS) {
          newUserCoordinates = coordinatesFromLS;
        } else {
          const geoData = await getGeoData(source);
          if (isCanceled) {
            return;
          }
          if (geoData?.latitude && geoData?.longitude) {
            newUserCoordinates = { latitude: geoData.latitude, longitude: geoData.longitude };
            userCoordinatesToLS(newUserCoordinates);
          }
        }
        coordinatesMutationFunc(newUserCoordinates);
      }

      if (newUserCoordinates.latitude && newUserCoordinates.longitude) {
        if (
          userCoordinates?.latitude !== newUserCoordinates.latitude ||
          userCoordinates?.longitude !== newUserCoordinates.longitude
        ) {
          setUserCoordinates(newUserCoordinates);
        }
      } else {
        localStorage.removeItem(localStorageKeys.userCoordinates);
      }
    })();

    return () => {
      isCanceled = true;
      source.cancel();
    };
  }, [userQ.data]);

  return { userCoordinates, coordinatesMutationFunc };
};
