import { Link, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { withLayout } from '../../components/layout/Layout';
import { pageRoutes } from '../../routes';
import * as S from './AboutPageStyles';
import { localStorageKeys } from '../../components/common/constants';
import { useEffect } from 'react';

const AboutPage = (): JSX.Element => {
  useEffect(() => {
    if (!localStorage.getItem(localStorageKeys.viewedAboutPage)) {
      localStorage.setItem(localStorageKeys.viewedAboutPage, 'true');
    }
  }, []);
  // todo links to env
  const contactAddresses = {
    email: 'v-pererabotku@mail.ru',
    telegramBot: 'https://t.me/v_pererabotku_bot',
  };
  return (
    <S.AboutPage>
      <S.AboutProject>
        <Typography variant="h6" display="inline">
          В-переработку
        </Typography>
        <Typography variant="subtitle1" display="inline">
          {' '}
          - это приложение, которое поможет организовать сортировку и вывоз вторсырья в пункты
          приёма.
        </Typography>
      </S.AboutProject>
      <S.Instructions>
        <Typography variant="subtitle1">Инструкция</Typography>
        <Typography>
          Всё начинается с{' '}
          <Link component={RouterLink} to={pageRoutes.search}>
            поискa
          </Link>
          .<br /> Ищите по названию сырья, типу материала или бытовому названию.
        </Typography>
        <Divider variant="middle" />
        <Typography>
          {`Материалы с кнопкой "В переработку" можно сдать. По нажатию на эту кнопку,
          для материала будет создана корзина. Корзина - это любая удобная ёмкость или пакет, которые
          стоит подписать в соответствии с названием в приложении. В дальнейшем приложение подскажет
          в какую корзину положить нужный материал или предложит создать новую.`}
        </Typography>
        <Divider variant="middle" />
        <Typography>
          Когда захотите сдать вторсырьё, заходите в раздел{' '}
          <Link component={RouterLink} to={pageRoutes.recyclePoints}>
            мои пункты приема
          </Link>{' '}
          и выбирайте самый оптимальный.
        </Typography>
      </S.Instructions>
      <S.Contacts>
        <Typography>Вопросы, пожелания и отзывы пожалуйста присылайте удобным способом:</Typography>
        <Link
          // todo outside link component
          rel="noopener noreferrer"
          target="_blank"
          href={contactAddresses.telegramBot}
        >
          Telegram
        </Link>
        <S.EmailLinkWithCopyButton>
          <Link
            // todo outside link component
            rel="noopener noreferrer"
            target="_blank"
            href={`mailto:${contactAddresses.email}`}
          >
            {contactAddresses.email}
          </Link>
          <Tooltip title="Скопировать email">
            <IconButton
              size="small"
              onClick={() => navigator.clipboard.writeText(contactAddresses.email)}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </S.EmailLinkWithCopyButton>
      </S.Contacts>
    </S.AboutPage>
  );
};

export default withLayout(AboutPage);
