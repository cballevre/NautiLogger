import { Grid, Typography } from 'antd';
import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const { useBreakpoint } = Grid;

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  const screens = useBreakpoint();

  return (
    <header
      style={{
        display: 'flex',
        flexDirection: screens.sm ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: screens.sm ? 'center' : 'flex-start',
        marginBottom: '24px',
      }}
    >
      <div>
        <Typography.Title
          level={1}
          style={{
            marginBlockStart: 0,
            fontSize: '20px',
            lineHeight: 1.4,
            marginBlockEnd: 0,
          }}
        >
          {title}
        </Typography.Title>
        {subtitle ? (
          <Typography.Text style={{ color: '#555555' }}>
            {subtitle}
          </Typography.Text>
        ) : null}
      </div>
      {actions ? (
        <div style={{ marginTop: screens.sm ? 0 : '16px' }}>{actions}</div>
      ) : null}
    </header>
  );
};

export { PageHeader };
