// todo rename file
export const getIDs = (arrIDs: string[] | { _id: string }[]): string[] => {
  return arrIDs.map((ruleId) => getId(ruleId));
};

export const getId = (model: string | { _id: string }): string => {
  if (typeof model === "object") {
    return model._id;
  }
  return model;
};
