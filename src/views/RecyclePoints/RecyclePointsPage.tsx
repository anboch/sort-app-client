import { useLocation } from 'react-router-dom';
import { pages } from '../../App';
import { withLayout } from '../../components/layout/Layout';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { useGetUser } from '../../hooks';
import { MyRecyclePoints } from '../../components/MyRecyclePoints';

const RecyclePointsPage = (): JSX.Element => {
  const userQ = useGetUser();
  const currentPath = useLocation().pathname;
  const pageName = pages.find((page) => page.path === currentPath)?.name;

  if (!userQ.data) {
    return <OfferToLogin sectionTitle={pageName} />;
  }
  return (
    <>
      <MyRecyclePoints />
    </>
  );
};

export default withLayout(RecyclePointsPage);
