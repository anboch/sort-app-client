import { Button, Typography } from '@mui/material';
import { QueryObserver, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../api';
import { withLayout } from "../../components/layout/Layout";
import { OfferToLogin } from '../../components/OfferToLogin/OfferToLogin';
import { ProfileActions } from '../../components/ProfileActions/ProfileActions';
import { ProfileInfo } from '../../components/ProfileInfo/ProfileInfo';
import { LoginFormContext } from '../../context/LoginFormContext';
// import { UserContext } from '../../context/UserContext';
import { useGetUser } from '../../hooks';
import * as S from './ProfilePageStyles';

const ProfilePage = (): JSX.Element => {

  // const { userQFromContext } = useContext(UserContext);
  const userQ = useGetUser();

  // useEffect(() => {
  //   const observer = new QueryObserver(queryClient, { queryKey: ["user"] });
  //   const unsubscribe = observer.subscribe((queryResult) => {
  //     console.log(
  //       'queryResult',
  //       queryResult
  //     );
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('userQFromContext----Page:', userQFromContext);
  // }, [userQFromContext]);


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
