import { useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { localStorageKeys } from '../components/common/constants';

export const useLogout = (): { logout: () => Promise<void> } => {
  const queryClient = useQueryClient();

  const logout = async (): Promise<void> => {
    localStorage.removeItem(localStorageKeys.accessToken);
    await api.logout();
    await queryClient.resetQueries([queryKeys.user]);
    await queryClient.resetQueries([queryKeys.bins]);
    // todo catch error
  };

  return { logout };
};
