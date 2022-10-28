import { Typography } from '@mui/material';
import React from 'react';
import { IUser } from '../../api/api.interface';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { EditableValue } from '../common/EditableValue';
import * as S from './ProfileInfoStyles';

interface IProfileInfoProps {
  userData: IUser;
}

const ProfileInfoItem = ({ property }: { property: string }) => {
  return (
    <S.ProfileInfoItem>
      <Typography variant="subtitle1" >
        {property}
      </Typography>
      {/* <Link
        href="#"
        variant="caption"
        underline="none"
      >
        edit
      </Link> */}
    </S.ProfileInfoItem>
  );
};


export const ProfileInfo = ({ userData }: IProfileInfoProps): JSX.Element => {
  const userM = useUpdateUser();
  const nameMutationFunc = (inputValue: string) => userM.mutate({ name: inputValue });
  return (
    <S.ProfileInfo>
      <EditableValue
        value={userData.name}
        mutationFunc={nameMutationFunc}
        title={'name'} />
      {userData.email &&
        <ProfileInfoItem property={userData.email} />}
    </S.ProfileInfo>
  );
};
