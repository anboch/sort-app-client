import { useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../api/api.constants';

export const useLogout = (): { logout: () => Promise<void> } => {
  const queryClient = useQueryClient();

  const logout = async (): Promise<void> => {
    // todo localStorage names to var
    localStorage.removeItem('access_token');
    await api.logout();
    await queryClient.resetQueries([queryKeys.user]);
    await queryClient.resetQueries([queryKeys.bins]);
    // todo catch error
  };

  return { logout };
};
