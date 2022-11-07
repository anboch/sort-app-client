import { BinList } from '../../components/BinList/BinList';
import { withLayout } from '../../components/layout/Layout';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { useGetUser } from '../../hooks';

const BinsPage = (): JSX.Element => {
  const userQ = useGetUser();

  if (!userQ.data) {
    return <OfferToLogin />;
  }
  return (
    <>
      <BinList />
    </>
  );
};

export default withLayout(BinsPage);
