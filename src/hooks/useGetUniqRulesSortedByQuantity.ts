import { IRule, IRuleSet } from "../api/api.interface";

export const useGetUniqRulesSortedByQuantity = (ruleSets: IRuleSet[]) => {
  const allRules = ruleSets.reduce((acc, ruleSet) => {
    // todo check that ruleSet.ruleIDs is IRule[]
    return [...acc, ...(ruleSet.ruleIDs as IRule[])];
  }, [] as IRule[]);

  return getUniqRulesSortedByQuantity(allRules);
};

const getUniqRulesSortedByQuantity = (rules: IRule[]) => {
  const quantityHash = rules.reduce((acc, rule) => {
    acc[rule._id] = (acc[rule._id] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const uniqRules = [
    ...new Map(rules.map((rule) => [rule._id, rule])).values(),
  ];

  return uniqRules.sort((a, b) => quantityHash[b._id] - quantityHash[a._id]);
};
