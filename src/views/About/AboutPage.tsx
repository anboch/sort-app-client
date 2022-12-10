import { Link, Typography, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { withLayout } from '../../components/layout/Layout';
import { pageRoutes } from '../../routes';
import * as S from './AboutPageStyles';
import { localStorageKeys } from '../../components/common/constants';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

const AboutPage = (): JSX.Element => {
  useEffect(() => {
    if (!localStorage.getItem(localStorageKeys.viewedAboutPage)) {
      localStorage.setItem(localStorageKeys.viewedAboutPage, 'true');
    }
  }, []);
  // todo links to env
  const contactAddresses = {
    email: 'sortirui.ru@mail.ru',
    telegramBot: 'https://t.me/sortirui_bot',
  };
  return (
    <S.AboutPage>
      <S.AboutProject>
        <Typography display="inline">СОРТИРУЙ</Typography>
        <Typography display="inline">
          {' '}
          - приложение, которое поможет организовать сортировку и вывоз вторсырья в пункты приёма.
        </Typography>
      </S.AboutProject>
      <S.Instructions>
        <Typography>
          Если вы ещё не занимались сортировкой вторсырья, то советуем ознакомиться с сайтом{' '}
          <Link href="https://rsbor-msk.ru/">Раздельный сбор</Link>. <br />
          На нем можно подробно узнать:
          <br />-{' '}
          <Link // todo outside link component
            rel="noopener noreferrer"
            target="_blank"
            href="https://rsbor-msk.ru/zerowaste/"
          >
            Как начать экологичный образ жизни
          </Link>
          <br />-{' '}
          <Link // todo outside link component
            rel="noopener noreferrer"
            target="_blank"
            href="https://rsbor-msk.ru/zachem-sortirovat/"
          >
            Зачем разделять отходы
          </Link>
          <br />-{' '}
          <Link // todo outside link component
            rel="noopener noreferrer"
            target="_blank"
            href="https://rsbor-msk.ru/2018/11/06/predpriyatiya-po-pererabotke-v-rossii/"
          >
            Перерабатывается ли вторсырье в России
          </Link>
          <br />и многое другое.
        </Typography>
        <Divider variant="middle" />
        <Typography>
          Для эффективной переработки, необходимо сортировать вторсырье <br />- по типам
          (принимаемые вместе материалы) <br />- и правилам пунктов приема. <br />
          Так как пунктов приема и видов материалов много, становится сложнее определить что, куда и
          как сдавать.
          <br /> С приложением СОРТИРУЙ это будет проще!
        </Typography>
      </S.Instructions>
      <S.Instructions>
        <Typography variant="subtitle1">Инструкция</Typography>
        <Divider variant="middle" />
        <Typography>
          Всё начинается с{' '}
          <Link component={RouterLink} to={pageRoutes.search}>
            поискa
          </Link>
          .<br /> Ищите по названию материала, типу сырья или бытовому названию.
          <br /> Материалы с кнопкой{' '}
          <Button size="small" variant="contained" endIcon={<AddIcon />}>
            В переработку
          </Button>{' '}
          можно сдать.
        </Typography>
        <Divider variant="middle" />
        <Typography>
          По нажатию на кнопку будет создана корзина.
          <br /> Корзина - это любая удобная ёмкость или пакет, которые стоит подписать как в
          приложении.
          <br /> В дальнейшем приложение подскажет, в какую корзину положить нужный материал, или
          предложит создать новую.
        </Typography>
        <Divider variant="middle" />
        <Typography>
          Когда захотите сдать вторсырьё, заходите в раздел{' '}
          <Link component={RouterLink} to={pageRoutes.recyclePoints}>
            пункты приема
          </Link>{' '}
          и выбирайте самый оптимальный.
        </Typography>
      </S.Instructions>
      <S.Contacts>
        <Typography>
          Вопросы, пожелания и отзывы, пожалуйста, присылайте удобным способом:
        </Typography>
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
