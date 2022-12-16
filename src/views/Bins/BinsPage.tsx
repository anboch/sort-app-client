import { useLocation } from 'react-router-dom';
import { pages } from '../../App';
import { BinList } from '../../components/BinList/BinList';
import { withLayout } from '../../components/layout/Layout';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { useGetUser } from '../../hooks/useGetUser';

const BinsPage = (): JSX.Element => {
  const userQ = useGetUser();
  const currentPath = useLocation().pathname;
  const pageName = pages.find((page) => page.path === currentPath)?.name;

  if (userQ.isLoading && userQ.isFetching) {
    return <LoadingSpinner />;
  }

  if (!userQ.data) {
    return <OfferToLogin sectionTitle={pageName} />;
  }
  return <BinList />;
};

export default withLayout(BinsPage);
