import { useReducer } from "react";

// todo delete
export const useForceUpdate = (): {
  forceUpdate: React.DispatchWithoutAction;
} => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  return { forceUpdate };
};
