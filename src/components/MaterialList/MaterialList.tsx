import { IMaterial } from '../../api/api.interface';
import * as S from './MaterialListStyles';
import { useGetUser } from '../../hooks/useGetUser';
import { MaterialItem } from '../MaterialItem/MaterialItem';
import { useGetBins } from '../../hooks/useGetBins';

export interface MaterialListProps {
  materials: IMaterial[];
}

export const MaterialList = ({ materials }: MaterialListProps): JSX.Element => {
  const userQ = useGetUser();
  const binsQ = useGetBins();

  // TODO add message that materials have not found
  return (
    <S.MaterialList>
      {materials.length > 0 &&
        materials.map((material) => (
          <MaterialItem key={material._id} material={material} userQ={userQ} binsQ={binsQ} />
        ))}
    </S.MaterialList>
  );
};
