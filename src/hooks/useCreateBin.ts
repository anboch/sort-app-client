import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { IBin } from '../api/api.interface';

export const useCreateBin = () => {
  const client = useQueryClient();

  return useMutation((valuesForCreate: Partial<IBin>) => api.createBin(valuesForCreate), {
    onMutate: async () => {
      await client.cancelQueries([queryKeys.bins]);
      const oldBins = client.getQueryData<IBin[]>([queryKeys.bins]);
      return { oldBins };
    },
    onError: (error, values, context) => {
      // todo handle error
    },
    onSuccess(newBin, variables, context) {
      const oldBins = context?.oldBins || [];
      client.setQueryData<IBin[]>([queryKeys.bins], [newBin, ...oldBins]);
      client.invalidateQueries([queryKeys.user]);
    },
    onSettled: () => {
      client.invalidateQueries([queryKeys.bins]);
    },
  });
};
