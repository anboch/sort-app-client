import styled from 'styled-components';
import { BodyProps } from './Body.props';

const Body = ({ children, className }: BodyProps): JSX.Element => {
  return <div className={className}>{children}</div>;
};

export const StyledBody = styled(Body)`
  grid-area: ${({ theme }): string => theme.layoutGridAreas.body};
  min-height: 90vh;
  padding: 20px 5px;
  /* display: flex; */
`;
