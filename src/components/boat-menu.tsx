import { useGo } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation } from 'react-router';

export type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    label: 'Interventions',
    key: 'interventions',
  },
  {
    label: 'Maintenance',
    key: 'maintenance',
  },
  {
    label: 'Equipment',
    key: 'equipment',
  },
  {
    label: 'Expenses',
    key: 'expenses',
  },
];

const BoatMenu = () => {
  const { pathname } = useLocation();
  const selectedKey = pathname.split('/').filter(Boolean).pop();
  const go = useGo();

  const onItemClick = (e: { key: string }) => {
    go({
      to: pathname.replace(selectedKey || 'dashboard', e.key),
    });
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey || 'dashboard']}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
      onClick={onItemClick}
    />
  );
};

export { BoatMenu };
