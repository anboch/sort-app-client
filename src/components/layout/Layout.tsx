import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StyledBody } from './Body/Body';
import { StyledFooter } from './Footer/Footer';
import { StyledHeader } from './Header/Header';
import { LayoutProps } from './Layout.props';

export const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  return (
    <div className={className}>
      <StyledHeader />
      <StyledBody>{children}</StyledBody>
      <StyledFooter />
    </div>
  );
};

export const StyledLayout = styled(Layout)`
  display: grid;
  grid-template-columns: auto minmax(320px, 1200px) auto;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  grid-template-areas:
    '. header .'
    '. body .'
    'footer footer footer';
`;

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <StyledLayout>
        <Component {...props} />
      </StyledLayout>
    );
  };
};
