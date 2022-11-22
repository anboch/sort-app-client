import { useLocation } from 'react-router-dom';
import { pages } from '../../App';
import { BinList } from '../../components/BinList/BinList';
import { withLayout } from '../../components/layout/Layout';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { useGetUser } from '../../hooks';

const BinsPage = (): JSX.Element => {
  const userQ = useGetUser();
  const currentPath = useLocation().pathname;
  const pageName = pages.find((page) => page.path === currentPath)?.name;

  if (!userQ.data) {
    return <OfferToLogin sectionTitle={pageName} />;
  }
  return (
    <>
      <BinList />
    </>
  );
};

export default withLayout(BinsPage);
