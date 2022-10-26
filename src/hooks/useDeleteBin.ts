/* Core */
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* Instruments */
import { api } from "../api/api";
import { queryKeys } from "../api/api.constants";
import { IBin } from "../api/api.interface";

export const useDeleteBin = () => {
  const client = useQueryClient();

  return useMutation(
    // todo redo Partial<IBin> to AtLeastOneAndID type
    (binId: string) => api.deleteBin(binId),
    {
      onMutate: async (binId: string) => {
        await client.cancelQueries([queryKeys.bins]);

        const oldBins = client.getQueryData<IBin[]>([queryKeys.bins]);

        if (oldBins) {
          const optimisticNewBins = oldBins.filter((bin) => bin._id !== binId);
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
