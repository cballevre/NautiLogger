import { Col, Row, Typography } from 'antd';
import type React from 'react';
import type { ReactNode } from 'react';

import { SettingsMenu } from '@/components/settings-menu.tsx';

interface SettingsLayoutProps {
  children: ReactNode;
  title: string;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, title }) => (
  <Row>
    <Col flex={1} style={{ padding: '24px 0' }}>
      <SettingsMenu />
    </Col>
    <Col flex={3} style={{ margin: 0, padding: 24, background: '#fff' }}>
      <Typography.Title level={2} style={{ marginBottom: 24 }}>
        {title}
      </Typography.Title>
      {children}
    </Col>
  </Row>
);

export { SettingsLayout };
