import { Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fuseOptions } from '../../hooks';
import { useSendFeedback } from '../../hooks/useSendFeedback';

export const MaterialNotFoundNotice = ({
  selectedTagsLength,
  searchResultLength,
  materialListLength,
  searchQuery,
  clearSelectedTags,
  clearSearch,
}: {
  selectedTagsLength: number;
  searchResultLength: number;
  materialListLength: number;
  searchQuery: string;
  clearSelectedTags: () => void;
  clearSearch: () => void;
}): JSX.Element | null => {
  const [failedRequestValue, setFailedRequestValue] = useState<string | null>(null);
  const { sentMaterialSuggestion } = useSendFeedback();

  const requestValueExists = searchQuery.length >= fuseOptions.minMatchCharLength;
  const sentAndInform = async (value: string) => {
    // todo add spinner
    await sentMaterialSuggestion(value);
    setFailedRequestValue(value);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      if (requestValueExists && !searchResultLength) {
        await sentAndInform(searchQuery);
      }
    })();
  }, [searchResultLength, selectedTagsLength, materialListLength, searchQuery]);

  useEffect(() => {
    if (!requestValueExists || searchResultLength) {
      setFailedRequestValue(null);
    }
  }, [searchQuery]);

  if (failedRequestValue) {
    return (
      <>
        <Typography variant="h6">Эх...</Typography>
        <Typography variant="body1">
          Мы сожалеем, что по запросу<span> {`"${failedRequestValue}"`} </span>ничего подходящего не
          нашлось. <br /> Но всё не напрасно! Мы уже передали информацию о вашей “редкости” и
          возможно скоро она здесь появится.
          <br /> Спасибо!
        </Typography>
      </>
    );
  }

  if (
    (searchResultLength || !searchQuery) &&
    selectedTagsLength &&
    materialListLength <= searchResultLength
  ) {
    return (
      <>
        Не нашли то, что искали? <br />
        Попробуйте изменить или{' '}
        <Link onClick={clearSelectedTags} component="button">
          сбросьте
        </Link>{' '}
        фильтры
      </>
    );
  }

  if (requestValueExists === !!searchResultLength && materialListLength && searchQuery) {
    return (
      <>
        Не нашли то, что искали?
        <Button onClick={async () => await sentAndInform(searchQuery)}>
          пожалуйста, нажмите здесь!
        </Button>
      </>
    );
  }

  if (!searchQuery && !searchResultLength && !selectedTagsLength) {
    return <>Введите ваш запрос</>;
  }

  return null;
};
