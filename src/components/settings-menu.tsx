import { useGo } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation } from 'react-router';

import type { MenuItem } from '@/components/boat-menu';

const items: MenuItem[] = [
  {
    label: 'General',
    key: 'common',
  },
  {
    label: 'Access',
    key: 'access',
  },
];

const SettingsMenu = () => {
  const { pathname } = useLocation();
  const go = useGo();

  const keys = pathname.split('/').filter(Boolean);

  const onItemClick = (e: { key: string }) => {
    if (e.key === 'common') {
      go({
        to: `/boats/${keys[1]}/settings`,
      });
    } else {
      go({
        to: `/boats/${keys[1]}/settings/${e.key}`,
      });
    }
  };

  const selectedKey = keys[3] || 'common';

  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedKey]}
      items={items}
      onClick={onItemClick}
    />
  );
};

export { SettingsMenu };
