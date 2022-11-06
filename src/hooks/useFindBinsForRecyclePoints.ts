import { useMemo } from 'react';
import { IBin, IRuleSet } from '../api/api.interface';
import { getId, getAllRecyclePointsFromRuleSets, makeUniqueById, getIDs } from '../utils/utils';

interface IBinsForRecyclePoints {
  [key: string]: IBin[];
}

export const useFindBinsForRecyclePoints = (bins: IBin[] | undefined) => {
  return useMemo((): {
    allRecyclePointsIds: string[];
    binsForRecyclePoints: IBinsForRecyclePoints;
  } => {
    if (!bins) {
      return { allRecyclePointsIds: [], binsForRecyclePoints: {} };
    }
    const binsForRecyclePoints: IBinsForRecyclePoints = {};

    bins.forEach((bin) => {
      if (typeof bin.ruleSetID === 'object') {
        bin.ruleSetID.recyclePointIDs.forEach((recyclePoint) => {
          if (binsForRecyclePoints[getId(recyclePoint)]) {
            binsForRecyclePoints[getId(recyclePoint)].push(bin);
          } else {
            binsForRecyclePoints[getId(recyclePoint)] = [bin];
          }
        });
      }
    });

    const allRuleSets = bins.reduce((acc, bin) => {
      // todo check that rule.recyclePointIDs is IRecyclePoint[]
      // todo to know why if(bin.ruleSetID === 'object') narrowing don't work
      // todo to know why acc.push(bin.ruleSetID as IRuleSet); don't work
      return [...acc, bin.ruleSetID as IRuleSet];
    }, [] as IRuleSet[]);

    // todo fix getAllRecyclePointsFromRuleSets to get right types
    const allRecyclePointsIds = getAllRecyclePointsFromRuleSets(makeUniqueById(allRuleSets));
    return {
      allRecyclePointsIds: [...new Set(getIDs(allRecyclePointsIds))],
      binsForRecyclePoints,
    };
  }, [bins]);
};
