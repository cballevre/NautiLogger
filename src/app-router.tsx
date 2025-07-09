import { Authenticated } from '@refinedev/core';
import { NavigateToResource } from '@refinedev/react-router';
import { Routes, Outlet, Route } from 'react-router';
import { AuthPage } from '@refinedev/antd';

import { ListBoat } from './pages/boats/list.tsx';
import { Layout } from './components/layout.tsx';
import { ShowBoat } from './pages/boats/show.tsx';
import { AddBoat } from './pages/boats/add.tsx';
import { BoatMenu } from './components/boat-menu.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-routes" redirectOnFail="/login">
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<ListBoat />} />
        <Route path="/boats/add" element={<AddBoat />} />
        <Route
          path="/boats/:id"
          element={
            <>
              <BoatMenu />
              <Outlet />
            </>
          }
        >
          <Route index element={<ShowBoat />} />
        </Route>
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
