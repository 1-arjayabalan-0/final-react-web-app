import { Layouts } from "../layouts/Layout";
import { Pages } from "./Pages";

export const PageRoutes = [
  {
    path: "/",
    Component: Pages.vStatePage,
    Layout: Layouts.AppLayout,
  },
  {
    path: "/Login",
    Component: Pages.LoginPage,
    exact: true,
  },
  {
    path: "/home",
    Component: Pages.AdminPage,
    Private: false,
    Layout: Layouts.AppLayout,
    modules: [
      {
        path: "/vState",
        Component: Pages.vStatePage,
        exact: true,
      },
      {
        path: "/cState",
        Component: Pages.cStatePage,
        exact: true,
      },
    ],
  },
  {
    path: "/home",
    Component: Pages.AdminPage,
    Private: false,
    Layout: Layouts.AppLayout,
    modules: [
      {
        path: "/vCountry",
        Component: Pages.vCountryPage,
        exact: true,
      },
      {
        path: "/cCountry",
        Component: Pages.cCountryPage,
        exact: true,
      },
    ],
  },
  {
    path: "",
    Component: Pages.NotFound,
  },
];
