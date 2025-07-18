import { AuthPage } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { BoatLayout } from '@/components/boat-layout';
import { Layout } from '@/components/layout.tsx';
import { Login } from '@/pages/auth/login.tsx';
import { AddBoat } from '@/pages/boats/add.tsx';
import { BoatDashboard } from '@/pages/boats/dashboard.tsx';
import { AddIntervention } from '@/pages/boats/interventions/add.tsx';
import { EditIntervention } from '@/pages/boats/interventions/edit';
import { InterventionList } from '@/pages/boats/interventions/list.tsx';
import { ShowIntervention } from '@/pages/boats/interventions/show.tsx';
import { ListBoat } from '@/pages/boats/list.tsx';

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
        <Route path="/boats/:boatId" element={<BoatLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<BoatDashboard />} />
          <Route path="interventions">
            <Route index element={<InterventionList />} />
            <Route path="add" element={<AddIntervention />} />
            <Route path=":interventionId">
              <Route index element={<ShowIntervention />} />
              <Route path="edit" element={<EditIntervention />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        element={
          <Authenticated key="auth-pages" fallback={<Outlet />}>
            <Navigate to="/" />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
        <Route
          path="/update-password"
          element={<AuthPage type="updatePassword" />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export { AppRouter };
