import {
  Link,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Button,
  AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { withLayout } from '../../components/layout/Layout';
import { pageRoutes } from '../../routes';
import * as S from './AboutPageStyles';
import { localStorageKeys } from '../../components/common/constants';
import { useEffect } from 'react';
import { pages } from '../../App';

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
        <S.Instruction>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="subtitle1">О сортировке</Typography>
          </AccordionSummary>
          <S.Details>
            <Typography>
              Если вы не занимались сортировкой вторсырья или хотите глубже изучить эту тему, то
              советуем ознакомиться с сайтом{' '}
              <Link display="inline-block" href="https://rsbor-msk.ru/">
                Раздельный сбор
              </Link>
              . <br />
              На нём можно подробно узнать:
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
              Для эффективной переработки, необходимо сортировать вторсырье по:
              <br />- типам (принимаемые вместе материалы) <br />- правилам пунктов приема. <br />
            </Typography>
            <Divider variant="middle" />
            <Typography>
              Так как пунктов приема и видов материалов много, становится сложнее определить что,
              куда и как сдавать.
              <br /> Приложение СОРТИРУЙ поможет разобраться!
            </Typography>
          </S.Details>
        </S.Instruction>
        <S.Instruction>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="subtitle1">Инструкция</Typography>
          </AccordionSummary>
          <S.Details>
            <Typography>
              Всё начинается с{' '}
              <Link component={RouterLink} to={pageRoutes.search}>
                поискa
              </Link>
              .<br /> Ищите по названию материала, типу сырья или бытовому названию.
              <br /> Материалы с кнопкой
              <br />
              <Button sx={{ margin: '5px' }} size="small" variant="contained">
                В переработку
              </Button>
              <br />
              можно сдать.
            </Typography>
            <Divider variant="middle" />
            <Typography>
              По нажатию на кнопку будет создана корзина. Аналогично корзине в приложении,
              подготовьте удобную ёмкость или пакет и подпишите в соответствии с названием корзины.
              <br /> В дальнейшем приложение подскажет куда положить нужный материал, или предложит
              создать новую корзину.
            </Typography>
            <Divider variant="middle" />
            <Typography>
              Когда захотите сдать вторсырьё, заходите в раздел{' '}
              <Link component={RouterLink} to={pageRoutes.recyclePoints}>
                {pages
                  .find((page) => page.path === pageRoutes.recyclePoints)
                  ?.name.toLocaleLowerCase()}
              </Link>{' '}
              и выбирайте самый оптимальный.
            </Typography>
          </S.Details>
        </S.Instruction>
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
