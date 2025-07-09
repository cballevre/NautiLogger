import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";
import { Routes, Outlet, Route } from "react-router";
import { AuthPage } from "@refinedev/antd";

import { ListBoat } from "./pages/boats/list.tsx";
import { Layout } from "./components/layout.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          // We're wrapping our routes with the `<Authenticated />` component
          // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
          // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
          <Authenticated key="authenticated-routes" redirectOnFail="/login">
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<ListBoat />} />
      </Route>
      <Route
        element={
          <Authenticated key="auth-pages" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
        <Route
          path="/update-password"
          element={<AuthPage type="updatePassword" />}
        />
      </Route>
    </Routes>
  );
};

export { AppRouter };
