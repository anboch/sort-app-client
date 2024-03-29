import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react';
import { LoginForm } from '../components/LoginForm/LoginForm';

interface ILoginFormContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LoginFormContext = createContext<ILoginFormContext>({} as ILoginFormContext);

export const LoginFormProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <LoginFormContext.Provider value={{ isOpen, setIsOpen }}>
      <LoginForm />
      {children}
    </LoginFormContext.Provider>
  );
};
