import { useLocation } from 'react-router-dom';
import { pages } from '../../App';
import { AppSettings } from '../../components/AppSettings/AppSettings';
import { withLayout } from '../../components/layout/Layout';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { Profile } from '../../components/Profile/Profile';

import { useGetUser } from '../../hooks';
import * as S from './ProfilePageStyles';

const ProfilePage = (): JSX.Element => {
  const userQ = useGetUser();
  const currentPath = useLocation().pathname;
  const pageName = pages.find((page) => page.path === currentPath)?.name;

  if (!userQ.data) {
    return <OfferToLogin sectionTitle={pageName} />;
  }
  return (
    <S.ProfilePage>
      <AppSettings />
      <Profile userData={userQ.data} />
    </S.ProfilePage>
  );
};

export default withLayout(ProfilePage);
