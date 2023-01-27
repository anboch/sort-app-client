import { IRuleSet, IRecyclePoint, IType, ICoordinates } from '../api/api.interface';

// todo rename file
export const getIDs = (arrIDs: string[] | { _id: string }[]): string[] => {
  return arrIDs.map((ruleId) => getId(ruleId));
};

export const getId = (model: string | { _id: string }): string => {
  if (typeof model === 'object') {
    return model._id;
  }
  return model;
};

export const isArrayOfObjects = (array: unknown[]): array is object[] => {
  for (const value of array) {
    if (typeof value !== 'object') return false;
  }
  return true;
};

export const isArrayOfDefinedValues = <T>(array: (T | undefined)[]): array is T[] => {
  for (const value of array) {
    if (typeof value === 'undefined') return false;
  }
  return true;
};

export const makeUniqueById = <T extends { _id: string }>(arr: T[]): T[] => [
  ...new Map(arr.map((item) => [item._id, item])).values(),
];

export const getAllRecyclePointsFromRuleSets = (ruleSets: IRuleSet[]): IRecyclePoint[] => {
  return ruleSets.reduce((acc, ruleSet) => {
    // todo check that rule.recyclePointIDs is IRecyclePoint[]
    return [...acc, ...(ruleSet.recyclePointIDs as IRecyclePoint[])];
  }, [] as IRecyclePoint[]);
};

export const getAllRuleSetsFromTypes = (types: IType[]): IRuleSet[] => {
  return types.reduce((acc, type) => {
    // todo check that type.ruleSetIDs is IRuleSet[]
    return [...acc, ...(type.ruleSetIDs as IRuleSet[])];
  }, [] as IRuleSet[]);
};
export const getDistanceFromLatLonInKm = (coord1: ICoordinates, coord2: ICoordinates): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coord2.latitude - coord1.latitude); // deg2rad below
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
