import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundPage from "./404";
import { Spin } from "antd";
import Publishers from "./components";
const loadable = (loader) => React.lazy(loader);
// Loadable({
//   loader,
//   // delay: false,
//   loading: () => <Loader />,
//   delay: 200
// })

const routes = [
  {
    path: "/",
    component: loadable(() => import("./components")),
    exact: true,
  },
  {
    path: "/publisher/:id",
    component: loadable(() => import("./components/PublisherDetail")),
    exact: true,
  },
];

class Router extends React.Component {
  render() {
    const { history } = this.props;
    console.log("9999", history);
    return (
      <Suspense fallback={<Spin tip="Loading..." />}>
        {/* <BrowserRouter> */}
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Publishers} />
            <Suspense fallback={<Spin tip="Loading..." />}>
              {routes.map((route) => {
                return (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={route.path}
                    exact={route.exact}
                  />
                );
              })}
            </Suspense>
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
        {/* </BrowserRouter> */}
      </Suspense>
    );
  }
}

export default Router;
