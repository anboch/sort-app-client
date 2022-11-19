import { Typography } from '@mui/material';
import { IUser } from '../../api/api.interface';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { ProfileActions } from '../ProfileActions/ProfileActions';
import { EditableValue } from '../common/EditableValue';

import * as S from './ProfileStyles';
import { useState } from 'react';

interface IProfileProps {
  userData: IUser;
}

const ProfileItem = ({ propertyTitle, property }: { propertyTitle: string; property: string }) => {
  return (
    <S.ProfileItem>
      <Typography variant="caption">{propertyTitle}</Typography>
      <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="subtitle1">
        {property}
      </Typography>
    </S.ProfileItem>
  );
};

export const Profile = ({ userData }: IProfileProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(userData.name ?? '');
  const userM = useUpdateUser();
  const nameMutationFunc = (inputValue: string) => userM.mutate({ name: inputValue });
  return (
    <S.Profile>
      <Typography sx={{ display: 'flex', justifyContent: 'end' }} variant="subtitle1">
        профиль
      </Typography>
      <EditableValue
        inputValue={inputValue}
        setInputValue={setInputValue}
        currentValue={userData.name}
        mutationFunc={nameMutationFunc}
        title={'имя'}
      />
      {userData.email && <ProfileItem propertyTitle="email" property={userData.email} />}
      <ProfileActions userData={userData} />
    </S.Profile>
  );
};
