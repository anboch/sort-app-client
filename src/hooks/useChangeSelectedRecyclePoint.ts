import { useEffect, useState } from "react";
import { IRecyclePoint, IRule, IRuleSet, IType } from "../api/api.interface";
import { getId } from "../utils/utils";

export const useChangeSelectedRecyclePoint = (
  allTypes: (IType | undefined)[]
) => {
  const [allRuleSets, setAllRuleSets] = useState<IRuleSet[]>([]);
  const [allRecyclePoints, setAllRecyclePoints] = useState<IRecyclePoint[]>([]);
  const [selectedRecyclePoint, setSelectedRecyclePoint] =
    useState<IRecyclePoint | null>(null);
  const [selectedRuleSet, setSelectedRuleSet] = useState<IRuleSet | null>(null);
  const [selectedType, setSelectedType] = useState<IType | null>(null);

  useEffect(() => {
    if (!allTypes.includes(undefined)) {
      // todo to know why allTypes not narrowing by !allTypes.includes(undefined) and remove allTypes as IType[]
      const newAllRuleSets = (allTypes as IType[]).reduce((acc, type) => {
        // todo check that type.ruleSetIDs is IRuleSet[]
        return [...acc, ...(type.ruleSetIDs as IRuleSet[])];
      }, [] as IRuleSet[]);

      const newAllRecyclePoints = newAllRuleSets.reduce((acc, rule) => {
        // todo check that rule.recyclePointIDs is IRecyclePoint[]
        return [...acc, ...(rule.recyclePointIDs as IRecyclePoint[])];
      }, [] as IRecyclePoint[]);
      setAllRuleSets(newAllRuleSets);
      setAllRecyclePoints(newAllRecyclePoints);
    }
  }, [allTypes]);

  useEffect(() => {
    // todo to know why allTypes not narrowing by !allTypes.includes(undefined) and remove allTypes as IType[]
    if (selectedRecyclePoint && !allTypes.includes(undefined)) {
      const newSelectedRuleSet = allRuleSets.find((ruleSet) =>
        ruleSet.recyclePointIDs
          .map((RP) => getId(RP))
          .includes(getId(selectedRecyclePoint))
      );
      setSelectedRuleSet(newSelectedRuleSet ?? null);

      if (newSelectedRuleSet) {
        const newSelectedType = (allTypes as IType[]).find((type) =>
          type.ruleSetIDs
            .map((RS) => getId(RS))
            .includes(getId(newSelectedRuleSet))
        );
        setSelectedType(newSelectedType ?? null);
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
