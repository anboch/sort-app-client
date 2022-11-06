import { api } from '../api/api';
import { IFeedback } from '../api/api.interface';
import { feedbackTypes, sessionStorageKeys } from '../components/common/constants';

export const useSendFeedback = () => {
  const sentMaterialSuggestion = async (newSuggestion: string): Promise<void> => {
    const sendedMaterialSuggestions: IFeedback['description'][] = JSON.parse(
      sessionStorage.getItem(sessionStorageKeys.materialSuggestions) ?? '[]'
    );

    if (sendedMaterialSuggestions.find((i) => i === newSuggestion)) {
      return;
    } else {
      await api.createFeedback({
        type: feedbackTypes.MATERIAL_NOT_FOUND,
        description: newSuggestion,
      });
      const newSendedMaterialSuggestions = [...sendedMaterialSuggestions, newSuggestion];
      sessionStorage.setItem(
        sessionStorageKeys.materialSuggestions,
        JSON.stringify(newSendedMaterialSuggestions)
      );
    }
  };

  return { sentMaterialSuggestion };
};
