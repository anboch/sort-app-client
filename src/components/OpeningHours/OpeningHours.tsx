import { Typography } from '@mui/material';
import { IRecyclePoint } from '../../api/api.interface';
import * as S from './OpeningHoursStyles';

const weekDays = new Map([
  [1, 'Пн'],
  [2, 'Вт'],
  [3, 'Ср'],
  [4, 'Чт'],
  [5, 'Пт'],
  [6, 'Сб'],
  [7, 'Вс'],
]);

export const OpeningHours = ({
  openingHours,
}: {
  openingHours: IRecyclePoint['openingHours'];
}): JSX.Element => {
  return (
    <S.OpeningHours>
      {openingHours?.dayAndNight ? (
        <Typography variant="subtitle1">Круглосуточно</Typography>
      ) : openingHours?.weekSchedule?.length ? (
        <S.WeekSchedule>
          {openingHours.weekSchedule.map((daySchedule) => {
            return (
              <S.daySchedule key={daySchedule.days.join(',')}>
                <S.Weekdays>
                  {daySchedule.days.map((day) => (
                    <Typography variant="subtitle1" key={day}>
                      {weekDays.get(+day)}
                    </Typography>
                  ))}
                </S.Weekdays>
                {daySchedule.periods?.map((period) => (
                  <Typography
                    variant="subtitle1"
                    key={period.start}
                  >{`${period.start} - ${period.end}`}</Typography>
                ))}
              </S.daySchedule>
            );
          })}
        </S.WeekSchedule>
      ) : (
        <Typography variant="subtitle1">Неизвестен</Typography>
      )}
    </S.OpeningHours>
  );
};
