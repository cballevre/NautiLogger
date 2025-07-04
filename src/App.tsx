import { Refine, Authenticated } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";
import routerProvider from "@refinedev/react-router";
import { Routes, Outlet, Route, Navigate } from "react-router";

import { supabaseClient } from "./utils/supabaseClient";
import { authProvider } from "./providers/auth-provider.ts";
import { ListBoat } from "./pages/boats/list.tsx";

import { Login } from "./pages/login.tsx";

function App() {

  return (
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
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<ListBoat />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
    </Refine>
  )
}

export default App
