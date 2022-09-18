import { UseQueryResult } from '@tanstack/react-query';
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { IUser } from "../api/api.interface";
import { useGetUser } from "../hooks";

interface IUserContext {
  user: IUser | null;
  injectUser: () => Promise<void>;
  removeUser: () => void;
  userQFromContext: UseQueryResult<IUser, unknown> | null
}

// todo remove UserContext
const UserContext = createContext<IUserContext>({
  user: null,
  injectUser: async () => { return; },
  removeUser: () => { return; },
  userQFromContext: null
});

export const UserProvider: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = useState<IUser | null>(null);
  const userQ = useGetUser();

  const injectUser = async () => {
    console.log('injectUser:')
    await userQ.refetch();
  };

  const removeUser = () => {
    // todo why remove don't change userQ state ?
    userQ.remove();
    setUser(null);
  };

  useEffect(() => {
    if (userQ.data) {
      setUser(userQ.data);
    }
    // else {
    //   setUser(null);
    // }
    console.log('userQ----Context:', userQ)
  }, [userQ]);

  return (
    <UserContext.Provider value={{ user, injectUser, removeUser, userQFromContext: userQ }}>
      {children}
    </UserContext.Provider>
  );
};
