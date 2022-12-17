import styled from 'styled-components';

export const OpeningHours = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WeekSchedule = styled.div`
  display: flex;
`;

export const Weekdays = styled.div`
  display: flex;
  & > *:not(:last-child):after {
    margin-right: ${({ theme }): string => theme.spacing(1)};
    content: ',';
  }
`;

export const daySchedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-right: ${({ theme }): string => theme.spacing(2)};
  :not(:last-child):after {
    content: '';
    position: absolute;
    border-left: 1px solid ${({ theme }): string => theme.palette.divider};
    right: ${({ theme }): string => theme.spacing(-1)};
    top: 10%;
    height: 80%;
  }
`;
