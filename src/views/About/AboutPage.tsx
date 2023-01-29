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
import { useEffect, useState } from 'react';
import { pages } from '../../App';
import { useCheckBrowser } from '../../hooks/useCheckBrowser';
import { browserPlatformTypes, useCheckPlatform } from '../../hooks/useCheckPlatform';
import { InstallAppInstruction } from '../../components/InstallAppInstruction/InstallAppInstruction';

const AboutPage = (): JSX.Element => {
  const browserType = useCheckBrowser();
  const browserPlatform = useCheckPlatform();
  const displayInstallAppInfo =
    browserPlatform === browserPlatformTypes.ANDROID ||
    browserPlatform === browserPlatformTypes.IOS;

  const [expended1, setExpended1] = useState(false);
  const [expended2, setExpended2] = useState(false);
  const [expended3, setExpended3] = useState(false);
  const [expended4, setExpended4] = useState(false);

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
        <S.Instruction expanded={expended1} onChange={(): void => setExpended1((state) => !state)}>
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
              рекомендуем ознакомиться с сайтом{' '}
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
                Перерабатывается ли вторсырьё в России
              </Link>
              <br />и многое другое.
            </Typography>
            <Divider variant="middle" />
            <Typography>
              Для эффективной переработки, необходимо сортировать вторсырьё по:
              <br />- типам (принимаемые вместе материалы) <br />- правилам <br />
              пунктов приёма. <br />
            </Typography>
            <Divider variant="middle" />
            <Typography>
              Основные правила подготовки вторсырья:
              <br />- чистое <br />- компактно сложено <br />- не уверен, не сдавай <br />
            </Typography>
            {/* <Divider variant="middle" />
            <Typography>
              Так как пунктов приема и видов материалов много, становится сложнее определить что,
              куда и как сдавать.
              <br /> Приложение СОРТИРУЙ поможет разобраться!
            </Typography> */}
          </S.Details>
        </S.Instruction>
        <S.Instruction expanded={expended2} onChange={(): void => setExpended2((state) => !state)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="subtitle1">Специфика приложения</Typography>
          </AccordionSummary>
          <S.Details>
            <Typography>
              В настоящее время культура сортировки в странах СНГ находится на низком уровне. В
              основном всё держится на энтузиазме небольшого количества людей. Существуют масштабные
              программы направленные на широкие массы людей (например &quot;синие контейнеры&quot; в
              Москве).
              <br /> В целом это более удобный (рядом с домом, нет строгих правил, мало фракций), но
              не очень эффективный способ сортировки и переработки вторсырья. Это намного лучше, чем
              не сортировать вовсе, так что если вы не чувствуете желания и ресурсов ездить подальше
              или заказывать эко-такси, то остановитесь на нём. К сожалению на данном этапе, из-за
              большого количества таких пунктов приёма, поддерживать информацию о них не
              представляется возможным.
            </Typography>
            <Divider variant="middle" />
            <Typography>
              Но если вы хотите сортировать вторсырьё наиболее эффективным способом, то это
              приложение для вас! Здесь собранны проверенные пункты приёма с наибольшим количеством
              фракций (Москва и Санкт-Петербург). Не обязательно начинать сразу со всех фракций,
              лучше начать с основных (те, что у вас копятся в самых больших объёмах) и постепенно
              расширять список.
            </Typography>
            <Divider variant="middle" />
            <Typography>
              Это приложение находится в бета-версии, так как для полноценной его работы необходимо,
              чтобы данные обновлялись непосредственно пунктами приема. Но чтобы заинтересовать
              пункты это делать, необходимо набрать активных пользователей. А пока информация будет
              обновляться в ручном режиме - заранее просим прощения за возможные неточности. Будем
              очень признательны за обнаруженные несоответствия.
            </Typography>
          </S.Details>
        </S.Instruction>
        <S.Instruction expanded={expended3} onChange={(): void => setExpended3((state) => !state)}>
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
                В корзину
              </Button>
              <br />
              можно сдать.
            </Typography>
            <Divider variant="middle" />
            <Typography>
              При нажатии на кнопку будет создана корзина.
              <br /> Аналогично виртуальной корзине в приложении, подготовьте удобную ёмкость или
              пакет и подпишите в соответствии с названием корзины.
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
        {displayInstallAppInfo && (
          <S.Instruction
            expanded={expended4}
            onChange={(): void => setExpended4((state) => !state)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="subtitle1">Установить на телефон/планшет</Typography>
            </AccordionSummary>
            <S.Details>
              <InstallAppInstruction browserType={browserType} />
            </S.Details>
          </S.Instruction>
        )}
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
