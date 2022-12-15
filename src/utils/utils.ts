import { IRuleSet, IRecyclePoint, IType } from '../api/api.interface';

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
