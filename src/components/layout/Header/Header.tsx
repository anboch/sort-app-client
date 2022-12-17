import styled from 'styled-components';
import { HeaderProps } from './Header.props';
import { ResponsiveAppBar } from './AppBar';

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
