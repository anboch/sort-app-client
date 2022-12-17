import { useEffect, useState } from 'react';
import { IBin } from '../../api/api.interface';
import { useGetBins } from '../../hooks/useGetBins';
import { useUpdateBin } from '../../hooks/useUpdateBin';
import { EditableValue } from '../EditableValue/EditableValue';

export const BinTitle = ({ _id, title = '' }: Pick<IBin, '_id' | 'title'>): JSX.Element => {
  const [inputValue, setInputValue] = useState(title);
  const binM = useUpdateBin();
  const binsQ = useGetBins();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutationFunc = (inputValue: string): void => binM.mutate({ _id, title: inputValue });
  const duplicateCheck = (title: string): void => {
    if (title && !!binsQ.data && binsQ.data?.map((bin) => bin.title).includes(title.trim())) {
      setErrorMessage('Корзина с таким названием уже существует');
    } else {
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (title !== inputValue) {
      duplicateCheck(inputValue);
    } else {
      setErrorMessage(null);
    }
  }, [inputValue]);

  return (
    <>
      <EditableValue
        mutationFunc={mutationFunc}
        inputValue={inputValue}
        setInputValue={setInputValue}
        currentValue={title}
        title={'название'}
        errorMessage={errorMessage}
      />
    </>
  );
};
