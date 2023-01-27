import { useEffect, useState } from 'react';
import { IRecyclePoint, IRuleSet, IType } from '../api/api.interface';
import {
  getAllRecyclePointsFromRuleSets,
  getAllRuleSetsFromTypes,
  getId,
  isArrayOfDefinedValues,
  makeUniqueById,
} from '../utils/utils';

export const useChangeSelectedRecyclePoint = (allTypes: (IType | undefined)[]) => {
  const [allRuleSets, setAllRuleSets] = useState<IRuleSet[]>([]);
  const [allRecyclePoints, setAllRecyclePoints] = useState<IRecyclePoint[]>([]);
  const [selectedRecyclePoint, setSelectedRecyclePoint] = useState<IRecyclePoint | null>(null);
  const [selectedRuleSet, setSelectedRuleSet] = useState<IRuleSet | null>(null);
  const [selectedType, setSelectedType] = useState<IType | null>(null);

  useEffect(() => {
    if (isArrayOfDefinedValues(allTypes)) {
      const newAllRuleSets = getAllRuleSetsFromTypes(allTypes);

      const newAllUniqRuleSets = makeUniqueById(newAllRuleSets);

      const newAllRecyclePoints = getAllRecyclePointsFromRuleSets(newAllUniqRuleSets);

      setAllRuleSets(newAllUniqRuleSets);
      setAllRecyclePoints(makeUniqueById(newAllRecyclePoints));
    }
  }, [allTypes]);

  useEffect(() => {
    if (selectedRecyclePoint && isArrayOfDefinedValues(allTypes)) {
      const newSelectedRuleSets = allRuleSets.filter((ruleSet) =>
        ruleSet.recyclePointIDs.map((RP) => getId(RP)).includes(getId(selectedRecyclePoint))
      );

      const newSelectedSortedRuleSets = newSelectedRuleSets.sort((a, b) => {
        return b.recyclePointIDs.length - a.recyclePointIDs.length;
      });

      setSelectedRuleSet(newSelectedSortedRuleSets[0] ?? null);

      if (newSelectedSortedRuleSets[0]) {
        const newSelectedTypes = allTypes.filter((type) =>
          type.ruleSetIDs.map((RS) => getId(RS)).includes(getId(newSelectedSortedRuleSets[0]))
        );

        const newSelectedSortedTypes = newSelectedTypes.sort((a, b) => {
          return (
            makeUniqueById(getAllRecyclePointsFromRuleSets(b.ruleSetIDs)).length -
            makeUniqueById(getAllRecyclePointsFromRuleSets(a.ruleSetIDs)).length
          );
        });

        setSelectedType(newSelectedSortedTypes[0] ?? null);
      }
    }
  }, [selectedRecyclePoint]);

  return {
    allRuleSets,
    allRecyclePoints,
    selectedType,
    selectedRuleSet,
    selectedRecyclePoint,
    setSelectedRecyclePoint,
  };
};
