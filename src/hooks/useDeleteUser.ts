/* Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';

/* Instruments */
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { IUser } from '../api/api.interface';
import { localStorageKeys } from '../components/common/constants';

export const useDeleteUser = () => {
  const client = useQueryClient();

  return useMutation((userId: IUser['_id']) => api.deleteUser(userId), {
    onMutate: async () => {
      await client.cancelQueries([queryKeys.user]);

      const user = client.getQueryData<IUser>([queryKeys.user]);

      return { user };
    },
    onError: (error, values, context) => {
      // todo handle error
    },

    onSuccess: async () => {
      localStorage.removeItem(localStorageKeys.accessToken);
      await client.resetQueries([queryKeys.user]);
      await client.resetQueries([queryKeys.bins]);
    },

    // onSettled: () => {
    //   client.invalidateQueries([queryKeys.user]);
    // },
  });
};
