import styled from 'styled-components';
import { ResponsiveAppBar } from '../../ResponsiveAppBar/ResponsiveAppBar';

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps): JSX.Element => {
  return (
    <div className={className}>
      <ResponsiveAppBar />
    </div>
  );
};

export const StyledHeader = styled(Header)`
  grid-area: ${({ theme }): string => theme.layoutGridAreas.header};
  padding: 5px;
`;
