import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { StyledBody } from './Body/Body';
import { Footer } from './Footer/Footer';
import { StyledHeader } from './Header/Header';

export const layoutGridAreas = {
  BODY: 'body',
  HEADER: 'header',
  FOOTER: 'footer',
} as const;

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  return (
    <div className={className}>
      <StyledHeader />
      <StyledBody>{children}</StyledBody>
      <Footer />
    </div>
  );
};

export const StyledLayout = styled(Layout)`
  display: grid;
  grid-template-columns: auto minmax(320px, 1200px) auto;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  grid-template-areas:
    '. ${layoutGridAreas.HEADER} .'
    '. ${layoutGridAreas.BODY} .'
    '${layoutGridAreas.FOOTER} ${layoutGridAreas.FOOTER} ${layoutGridAreas.FOOTER}';
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
