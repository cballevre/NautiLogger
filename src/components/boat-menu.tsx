import { useGo, useTranslation } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation } from 'react-router';

export type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'dashboard',
  },
  {
    key: 'interventions',
  },
  {
    key: 'equipments',
  },
];

const BoatMenu = () => {
  const { pathname } = useLocation();
  const go = useGo();
  const { translate } = useTranslation();

  const keys = pathname.split('/').filter(Boolean);

  const onItemClick = (e: { key: string }) => {
    go({
      to: `/boats/${keys[1]}/${e.key}`,
    });
  };

  const translatedItems = items.map((item) =>
    item
      ? {
          ...item,
          label: translate(`boats.menu.${item.key}`),
        }
      : item,
  );

  const selectedKey = keys[2] || 'dashboard';

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={translatedItems}
      style={{ padding: '0 32px' }}
      onClick={onItemClick}
    />
  );
};

export { BoatMenu };
