import { Link, Typography, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { withLayout } from '../../components/layout/Layout';
import { pageRoutes } from '../../routes';
import * as S from './AboutPageStyles';

const AboutPage = (): JSX.Element => {
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
          <Typography>
            Всё начинается с{' '}
            <Link component={RouterLink} to={pageRoutes.search}>
              поискa
            </Link>
            .<br /> Ищите по названию сырья, типу материала или бытовому названию.
          </Typography>
        </Typography>
        <Divider variant="middle" />
        <Typography>
          После того как нужный материал найден, для него можно создать корзину. Корзина - это любая
          удобная ёмкость или пакет. Её стоит подписать в соответствии с названием. В дальнейшем
          приложение само подскажет куда положить нужный материал или предложит создать новую
          корзину.
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
      </S.Contacts>
    </S.AboutPage>
  );
};

export default withLayout(AboutPage);
