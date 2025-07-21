import { Typography } from 'antd';
import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Typography.Title level={1}>{title}</Typography.Title>
        {subtitle ? <Typography>{subtitle}</Typography> : null}
      </div>
      {actions ? <div>{actions}</div> : null}
    </header>
  );
};

export { PageHeader };
