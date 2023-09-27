import { useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import RouterCombiner from "./routes/RouteCombiner";
import PrivateRoute from "./routes/PrivateRoute";

import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "jquery/dist/jquery.min.js";

import { pageLoadScript } from "./assets/js/common-utilities";
import "../src/assets/css/style.css";

import { PageRoutes } from "./routes/PageRoutes";
import { Toast } from "./assets/css/prime-library";

const App = () => {
  const toastRef = useRef(null);
  useEffect(() => {
    pageLoadScript();
  });

  const auth = true; /* Its Only Use For Now,I Handle It With ReduxStore */
  return (
    <PrimeReactProvider>
      <div>
        <Router>
          <RouterCombiner
            routes={PageRoutes}
            PrivateRoute={PrivateRoute}
            auth={auth}
          />
        </Router>
      </div>
      <Toast ref={toastRef} />
    </PrimeReactProvider>
  );
};
export default App;
