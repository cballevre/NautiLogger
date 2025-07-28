import { Link } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Layout as LayoutAntd } from 'antd';
import type { FC } from 'react';

import { LogoutButton } from './logout-button';

const { Header, Content, Footer } = LayoutAntd;

export type MenuItem = Required<MenuProps>['items'][number];
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutAntd style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to="/"
          style={{ color: 'white', fontSize: '24px', marginRight: '20px' }}
        >
          <span>Vessel</span>
          <span style={{ color: '#1890ff' }}>Vigil</span>
        </Link>
        <LogoutButton style={{ marginLeft: 'auto', color: 'white' }} />
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} VesselVigil created by
        <a style={{ marginLeft: 4 }} href="https://cballevre.net">
          Célestin
        </a>
      </Footer>
    </LayoutAntd>
  );
};

export { Layout };
