import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import SearchPage from "./views/Search/SearchPage";
import BinsPage from "./views/Bins/BinsPage";
import ProfilePage from "./views/Profile/ProfilePage";
import AboutPage from "./views/About/AboutPage";
import "./App.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { CssBaseline } from '@mui/material';
import { pageRoutes } from './routes';
import { LoginFormProvider } from './context/LoginFormContext';
import { RecyclePointsPage } from './views/RecyclePoints';
// import { UserProvider } from './context/UserContext';

interface IPage {
  name: string;
  path: string;
}

export const pages: IPage[] = [
  {
    name: "Search",
    path: pageRoutes.search,
  },
  {
    name: "My bins",
    path: pageRoutes.bins,
  },
  {
    name: "My Recycle Points",
    path: pageRoutes.recyclePoints,
  },
  {
    name: "Profile",
    path: pageRoutes.profile,
  },
  {
    name: "About",
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
        {/* <UserProvider> */}
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
        {/* </UserProvider> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
