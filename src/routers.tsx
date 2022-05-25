import NotFound from "./Components/NotFount";
import Home from "./Components/Home";
import Cabinet from "./Components/Cabinet";

export enum pagesPath {
  cabinet = '/cabinet',
  notFound = '*',
  home = '/'
}

export const config = [
  { path: pagesPath.home, element: <Home/> },
  { path: pagesPath.cabinet, element: <Cabinet/> },
  { path: pagesPath.notFound, element: <NotFound/> }
];