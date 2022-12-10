import { Link, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { fuseOptions } from '../../hooks';
import { useSendFeedback } from '../../hooks/useSendFeedback';
import * as S from './MaterialNotFoundNoticeStyles';

export const MaterialNotFoundNotice = ({
  searchInputValueLength,
  selectedTagsLength,
  searchResultLength,
  materialListLength,
  searchQuery,
  clearSelectedTags,
}: {
  searchInputValueLength: number;
  selectedTagsLength: number;
  searchResultLength: number;
  materialListLength: number;
  searchQuery: string;
  clearSelectedTags: () => void;
}): JSX.Element | null => {
  const [failedRequestValue, setFailedRequestValue] = useState<string | null>(null);
  const { sentMaterialSuggestion } = useSendFeedback();
  const theme = useTheme();

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
      <S.MaterialNotFoundNotice>
        <Typography variant="body1">
          Эх... Мы сожалеем, что по запросу
          <span style={{ fontWeight: 'bold' }}> {`"${failedRequestValue}"`} </span>
          ничего подходящего не нашлось. <br /> Но всё не напрасно! Мы уже передали информацию о
          вашей “редкости” и возможно скоро она здесь появится.
        </Typography>
      </S.MaterialNotFoundNotice>
    );
  }

  if (
    (searchResultLength || !searchQuery) &&
    selectedTagsLength &&
    materialListLength <= searchResultLength
  ) {
    return (
      <S.MaterialNotFoundNotice>
        <Typography variant="subtitle1">
          Не нашли то, что искали? <br />
          Попробуйте изменить или{' '}
        </Typography>
        <Link
          onClick={clearSelectedTags}
          variant="subtitle1"
          color={theme.palette.primary.dark}
          component="button"
        >
          сбросьте фильтры
        </Link>
      </S.MaterialNotFoundNotice>
    );
  }

  if (requestValueExists === !!searchResultLength && materialListLength && searchQuery) {
    return (
      <S.MaterialNotFoundNotice>
        <Typography variant="subtitle1">Не нашли то, что искали?</Typography>

        <Typography
          component={Link}
          style={{ cursor: 'pointer' }}
          // color="info"
          onClick={async () => await sentAndInform(searchQuery)}
        >
          нажмите здесь
        </Typography>
      </S.MaterialNotFoundNotice>
    );
  }

  if (!searchQuery && !searchResultLength && !selectedTagsLength && !searchInputValueLength) {
    return (
      <S.MaterialNotFoundNotice>
        <Typography variant="subtitle1">
          Поиск по названию материала, типу сырья или бытовому названию
        </Typography>
      </S.MaterialNotFoundNotice>
    );
  }

  return null;
};
