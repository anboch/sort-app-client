/* Core */
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* Instruments */
import { api } from "../api/api";
import { queryKeys } from "../api/api.constants";
import { IBin } from "../api/api.interface";

interface IUpdateBinProps extends Partial<IBin> {
  _id: string;
}

export const useUpdateBin = () => {
  const client = useQueryClient();

  return useMutation(
    (valuesForUpdate: IUpdateBinProps) => api.updateBin(valuesForUpdate),
    {
      onMutate: async (valuesForUpdate: IUpdateBinProps) => {
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
