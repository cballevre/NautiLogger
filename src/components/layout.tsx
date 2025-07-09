import type { FC } from "react";
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from "antd";
import type { MenuProps } from 'antd';

import { LogoutButton } from "./logout-button";

const { Header, Content, Footer } = LayoutAntd;

export type MenuItem = Required<MenuProps>['items'][number];
interface LayoutProps {
  children: React.ReactNode;
  menuItems?: MenuItem[];
}

const Layout: FC<LayoutProps> = ({ children, menuItems }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <LayoutAntd>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "white", fontSize: "24px", marginRight: "20px" }}>
          Nauti Logger
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
        <LogoutButton style={{ marginLeft: "auto", color: "white" }} />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Nauti Logger created by
        <a style={{ marginLeft: 4 }} href="https://cballevre.net">Célestin</a>
      </Footer>
    </LayoutAntd>
  );
};

export { Layout };
