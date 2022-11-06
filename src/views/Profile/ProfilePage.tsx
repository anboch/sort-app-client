import { withLayout } from "../../components/layout/Layout";
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { ProfileActions } from '../../components/ProfileActions/ProfileActions';
import { ProfileInfo } from '../../components/ProfileInfo/ProfileInfo';

import { useGetUser } from '../../hooks';
import * as S from './ProfilePageStyles';

const ProfilePage = (): JSX.Element => {
  const userQ = useGetUser();

  if (!userQ.data) {
    return <OfferToLogin />;
  }
  return (
    <S.ProfilePage>
      <ProfileInfo userData={userQ.data} />
      <ProfileActions userData={userQ.data} />
    </S.ProfilePage>
  );
};

export default withLayout(ProfilePage);
