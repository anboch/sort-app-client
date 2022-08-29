import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import SearchPage from "./views/Search/SearchPage";
import BinsPage from "./views/Bins/BinsPage";
import RecyclePointsPage from "./views/RecyclePoints/RecyclePointsPage";
import ProfilePage from "./views/Profile/ProfilePage";
import AboutPage from "./views/About/AboutPage";
import "./App.css";
import { CssBaseline } from '@mui/material';

export enum ROUTE_MAP {
  SEARCH = "/",
  MY_BINS = "/bins",
  RECYCLE_POINTS = "/recycle-points",
  PROFILE = "/profile",
  ABOUT = "/about",
}

interface IPage {
  name: string;
  path: string;
}

export const pages: IPage[] = [
  {
    name: "Search",
    path: ROUTE_MAP.SEARCH,
  },
  {
    name: "My bins",
    path: ROUTE_MAP.MY_BINS,
  },
  {
    name: "Recycle points",
    path: ROUTE_MAP.RECYCLE_POINTS,
  },
  {
    name: "Profile",
    path: ROUTE_MAP.PROFILE,
  },
  {
    name: "About",
    path: ROUTE_MAP.ABOUT,
  },
];

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    // <ThemeProvider theme={theme}>
    //   <Button variant="contained">Hello World</Button>
    // </ThemeProvider>
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTE_MAP.SEARCH} element={<SearchPage />} />
            <Route path={ROUTE_MAP.MY_BINS} element={<BinsPage />} />
            <Route
              path={ROUTE_MAP.RECYCLE_POINTS}
              element={<RecyclePointsPage />}
            />
            <Route path={ROUTE_MAP.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTE_MAP.ABOUT} element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
