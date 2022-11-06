import { Bin } from '../../components/Bin/Bin';
import { BinList } from '../../components/BinList/BinList';
import { withLayout } from '../../components/layout/Layout';
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { useGetUser } from '../../hooks';
import { useGetBins } from '../../hooks/useGetBins';

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
