import { Refine, Authenticated } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";
import routerProvider, {
  NavigateToResource
} from "@refinedev/react-router";
import { Routes, Outlet, Route } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";
import { AuthPage } from "@refinedev/antd";
import { BrowserRouter } from "react-router";

import { supabaseClient } from "./utils/supabaseClient";
import { authProvider } from "./providers/auth-provider.ts";
import { ListBoat } from "./pages/boats/list.tsx";
import { Layout } from "./components/layout.tsx";

function App() {

  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}>
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
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
