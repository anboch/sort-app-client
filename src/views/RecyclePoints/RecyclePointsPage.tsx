import { withLayout } from '../../components/layout/Layout';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { useGetUser } from '../../hooks';
import { MyRecyclePoints } from '../../components/MyRecyclePoints';

const RecyclePointsPage = (): JSX.Element => {
  const userQ = useGetUser();

  if (!userQ.data) {
    return <OfferToLogin />;
  }
  return (
    <>
      <MyRecyclePoints />
    </>
  );
};

export default withLayout(RecyclePointsPage);
