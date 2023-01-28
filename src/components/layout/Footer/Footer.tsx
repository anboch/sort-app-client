import { Divider, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { ValueOf } from '../../common/types';
import { DocumentsForm, documentTypes } from '../../DocumentsForm/DocumentsForm';
import * as S from './FooterStyles';

export const Footer = (): JSX.Element => {
  const [openedDocument, setOpenedDocument] = useState<ValueOf<typeof documentTypes> | null>(null);
  return (
    <S.Footer>
      <DocumentsForm openedDocument={openedDocument} setOpenedDocument={setOpenedDocument} />
      <Typography variant={'subtitle2'}>
        Сортируй (бета-версия) © {new Date().getFullYear() !== 2022 ? '2022 -' : null}{' '}
        {new Date().getFullYear()}
      </Typography>
      <Divider />
      <S.Documents>
        <Link component="button" onClick={(): void => setOpenedDocument(documentTypes.UA)}>
          Пользовательское соглашение
        </Link>
        <Link component="button" onClick={(): void => setOpenedDocument(documentTypes.CONF)}>
          Политика конфиденциальности
        </Link>
      </S.Documents>
    </S.Footer>
  );
};
