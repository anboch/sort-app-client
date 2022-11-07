import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import SearchPage from './views/Search/SearchPage';
import BinsPage from './views/Bins/BinsPage';
import ProfilePage from './views/Profile/ProfilePage';
import AboutPage from './views/About/AboutPage';
import { CssBaseline } from '@mui/material';
import { pageRoutes } from './routes';
import { LoginFormProvider } from './context/LoginFormContext';
import { RecyclePointsPage } from './views/RecyclePoints';

interface IPage {
  name: string;
  path: string;
}

export const pages: IPage[] = [
  {
    name: 'Поиск',
    path: pageRoutes.search,
  },
  {
    name: 'Мои корзины',
    path: pageRoutes.bins,
  },
  {
    name: 'Мои пункты приёма',
    path: pageRoutes.recyclePoints,
  },
  {
    name: 'Профиль',
    path: pageRoutes.profile,
  },
  {
    name: 'О проекте',
    path: pageRoutes.about,
  },
];

const queryClient = new QueryClient({
  // defaultOptions: {
  // queries: {
  // notifyOnChangeProps: 'all',
  //   refetchOnWindowFocus: false,
  //   refetchOnmount: false,
  //   refetchOnReconnect: false,
  //   retry: false,
  //   staleTime: 5 * 60 * 1000,
  // },
  // },
});

export default function App(): JSX.Element {
  return (
    // <ThemeProvider theme={theme}>
    //   <Button variant="contained">Hello World</Button>
    // </ThemeProvider>
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <LoginFormProvider>
          <BrowserRouter>
            <Routes>
              <Route path={pageRoutes.search} element={<SearchPage />} />
              <Route path={pageRoutes.bins} element={<BinsPage />} />
              <Route path={pageRoutes.recyclePoints} element={<RecyclePointsPage />} />
              <Route path={pageRoutes.profile} element={<ProfilePage />} />
              <Route path={pageRoutes.about} element={<AboutPage />} />
            </Routes>
          </BrowserRouter>
        </LoginFormProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
