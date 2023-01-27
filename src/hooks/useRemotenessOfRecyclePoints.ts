import { useMemo } from 'react';
import { IRecyclePoint } from '../api/api.interface';
import { getDistanceFromLatLonInKm } from '../utils/utils';
import { useGetUserLocation } from './useGetUserLocation';

export const useRemotenessOfRecyclePoints = (
  recyclePoints: IRecyclePoint[]
): {
  distanceToNearestRecyclePoint: number;
  isRecyclePointFarAway: boolean;
} => {
  const { userCoordinates } = useGetUserLocation();

  const distanceToNearestRecyclePoint = useMemo(() => {
    if (!userCoordinates || !recyclePoints.length) {
      return 0;
    }
    return Math.round(
      recyclePoints
        .map((recyclePoint) =>
          getDistanceFromLatLonInKm(recyclePoint.position.coordinates, userCoordinates)
        )
        .sort((a, b) => a - b)[0]
    );
  }, [userCoordinates, recyclePoints]);

  const isRecyclePointFarAway = distanceToNearestRecyclePoint > 100;

  return { distanceToNearestRecyclePoint, isRecyclePointFarAway };
};
