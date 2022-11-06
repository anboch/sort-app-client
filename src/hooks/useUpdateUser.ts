/* Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';

/* Instruments */
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { IUser } from '../api/api.interface';

export const useUpdateUser = () => {
  const client = useQueryClient();

  return useMutation(
    // todo redo Partial<IUser> to AtLeastOneAndID type
    (valuesForUpdate: Partial<IUser>) => api.updateUser(valuesForUpdate),
    {
      onMutate: async (valuesForUpdate: Partial<IUser>) => {
        await client.cancelQueries([queryKeys.user]);

        const oldUser = client.getQueryData<IUser>([queryKeys.user]);

        if (oldUser) {
          const optimisticNewUser = {
            ...oldUser,
            ...valuesForUpdate,
          };

          client.setQueryData<IUser>([queryKeys.user], optimisticNewUser);
        }

        return { oldUser };
      },
      onError: (error, values, context) => {
        // todo handle error
        if (context?.oldUser) {
          client.setQueryData<IUser>([queryKeys.user], context.oldUser);
        }
      },
      onSettled: () => {
        client.invalidateQueries([queryKeys.user]);
      },
    }
  );
};
