import { Menu } from 'antd';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Interventions',
    key: 'interventions',
  },
  {
    label: 'Maintenance',
    key: 'maintenance',
  },
];

const BoatMenu = () => {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export { BoatMenu };
