import { Typography } from 'antd';
import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header>
      <Typography.Title level={1}>{title}</Typography.Title>
      {subtitle ? <Typography>{subtitle}</Typography> : null}
    </header>
  );
};

export { PageHeader };
