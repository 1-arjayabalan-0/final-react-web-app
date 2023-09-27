import AppTable from "../components/AppTable";

import { lazy } from "react";

export const Pages = {
  LoginPage: lazy(() => import("../pages/auth/Login")),

  vStatePage: lazy(() => import("../pages/master/State/vState")),
  cStatePage: lazy(() => import("../pages/master/State/cState")),

  vCountryPage: lazy(() => import("../pages/master/Country/vCountry")),
  cCountryPage: lazy(() => import("../pages/master/Country/cCountry")),

  AdminPage: () => <div>Hi I'am Admin Page</div>,
  AdminNewUser: () => <div>I'am New User Page,I'am Under Admin Page</div>,
  NotFound: () => <div>404 NotFound</div>,
};
