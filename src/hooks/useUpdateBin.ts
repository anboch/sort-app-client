/* Core */
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* Instruments */
import { api } from "../api/api";
import { queryKeys } from "../api/api.constants";
import { IBin } from "../api/api.interface";

export const useUpdateBin = () => {
  const client = useQueryClient();

  return useMutation(
    // todo redo Partial<IBin> to AtLeastOneAndID type
    (valuesForUpdate: Partial<IBin>) => api.updateBin(valuesForUpdate),
    {
      onMutate: async (valuesForUpdate: Partial<IBin>) => {
        if (!valuesForUpdate._id) {
          return;
        }
        await client.cancelQueries([queryKeys.bins]);

        const oldBins = client.getQueryData<IBin[]>([queryKeys.bins]);

        if (oldBins) {
          const optimisticNewBins = oldBins.map((bin) =>
            bin._id === valuesForUpdate._id
              ? { ...bin, ...valuesForUpdate }
              : bin
          );
          client.setQueryData<IBin[]>([queryKeys.bins], optimisticNewBins);
        }

        return { oldBins };
      },
      onError: (error, values, context) => {
        // todo handle error
        if (context?.oldBins) {
          client.setQueryData<IBin[]>([queryKeys.bins], context.oldBins);
        }
      },
      onSettled: () => {
        client.invalidateQueries([queryKeys.bins]);
      },
    }
  );
};
