import { Typography, useTheme } from '@mui/material';
import * as S from './BinRulesStyles';
import { useGetUniqRulesSortedByQuantity } from '../../hooks/useGetUniqRulesSortedByQuantity';
import { getIDs } from '../../utils/utils';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { IRuleSet } from '../../api/api.interface';

export const BinRules = ({
  selectedRuleSet,
  allRuleSets,
  isEditMode = false,
}: {
  selectedRuleSet: IRuleSet | null;
  allRuleSets: IRuleSet[] | null;
  isEditMode?: boolean;
}) => {
  const theme = useTheme();
  const uniqRulesSortedByQuantity = useGetUniqRulesSortedByQuantity(
    isEditMode ? allRuleSets || [] : selectedRuleSet ? [selectedRuleSet] : []
  );
  const selectedRuleIds = getIDs(selectedRuleSet?.ruleIDs ?? []);
  const isSelected = (ruleId: string) => (isEditMode ? selectedRuleIds?.includes(ruleId) : true);

  // todo fixed hight of rules before choose RP
  return (
    <S.BinRules>
      <Typography display="block" variant="caption">
        правила
      </Typography>
      {isEditMode && allRuleSets && !selectedRuleSet ? (
        <Typography color={theme.palette.info.main} variant="subtitle1">
          Выберите пункт приема на карте, чтобы увидеть правила
        </Typography>
      ) : allRuleSets && !uniqRulesSortedByQuantity.length ? (
        <Typography>- - -</Typography>
      ) : allRuleSets ? (
        uniqRulesSortedByQuantity.map((rule) => {
          if (typeof rule === 'object' && rule.description) {
            return (
              <S.BinRule key={rule._id} selected={isSelected(rule._id)}>
                - {rule.description}
              </S.BinRule>
            );
          }
        })
      ) : (
        <LoadingSpinner />
      )}
    </S.BinRules>
  );
};
