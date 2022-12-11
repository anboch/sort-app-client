import { useLocation } from 'react-router-dom';
import { pages } from '../../App';
import { AppSettings } from '../../components/AppSettings/AppSettings';
import { withLayout } from '../../components/layout/Layout';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { Profile } from '../../components/Profile/Profile';

import { useGetUser } from '../../hooks';
import * as S from './ProfilePageStyles';

const ProfilePage = (): JSX.Element => {
  const userQ = useGetUser();
  const currentPath = useLocation().pathname;
  const pageName = pages.find((page) => page.path === currentPath)?.name;

  return (
    <S.ProfilePage>
      <AppSettings />
      {userQ.isLoading && userQ.isFetching ? (
        <LoadingSpinner />
      ) : !userQ.data ? (
        <OfferToLogin sectionTitle={pageName} />
      ) : (
        <Profile userData={userQ.data} />
      )}
    </S.ProfilePage>
  );
};

export default withLayout(ProfilePage);
