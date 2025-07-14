import { AuthPage } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import { NavigateToResource } from '@refinedev/react-router';
import { Navigate, Outlet, Route, Routes } from 'react-router';
import { BoatMenu } from './components/boat-menu.tsx';
import { Layout } from './components/layout.tsx';
import { AddBoat } from './pages/boats/add.tsx';
import { BoatDashboard } from './pages/boats/dashboard.tsx';
import { InterventionList } from './pages/boats/interventions/list.tsx';
import { ListBoat } from './pages/boats/list.tsx';

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
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<BoatDashboard />} />
          <Route path="interventions">
            <Route index element={<InterventionList />} />
          </Route>
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
