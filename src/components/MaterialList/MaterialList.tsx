import { IMaterial } from '../../api/api.interface';
import * as S from './MaterialListStyles';
import { useGetUser } from '../../hooks';
import { MaterialItem } from '../MaterialItem';

export interface MaterialListProps {
  materials: IMaterial[]
}

export const MaterialList = ({ materials }: MaterialListProps): JSX.Element => {
  const userQ = useGetUser();

  // TODO add message that materials have not found
  return (
    <S.MaterialList>
      {materials.length > 0 &&
        materials.map((material) => (
          <MaterialItem
            key={material._id}
            material={material}
            userQ={userQ}
          />
        ))
      }
    </S.MaterialList >
  );
};