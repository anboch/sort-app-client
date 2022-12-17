import { Chip, Typography } from '@mui/material';
import { ITag } from '../../api/api.interface';
import * as S from './TagListStyles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface TagListProps {
  tags: ITag[];
  addFilter: (tagID: string) => void;
}

export const TagList = ({ tags, addFilter }: TagListProps): JSX.Element => {
  // TODO add message that tags have not found
  return (
    <S.TagList>
      <Typography variant="caption" gutterBottom>
        Добавить фильтр:
      </Typography>
      <S.ChipList>
        {tags?.map(({ _id, titles }) => (
          <Chip
            key={_id}
            icon={<AddCircleIcon />}
            label={titles.join(', ')}
            variant="outlined"
            onClick={(): void => addFilter(_id)}
          />
        ))}
      </S.ChipList>
    </S.TagList>
  );
};
