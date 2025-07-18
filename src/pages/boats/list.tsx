import { PlusOutlined } from '@ant-design/icons';
import { useGo, useList, useTranslation } from '@refinedev/core';
import { Card, Col, Row } from 'antd';

import { PageHeader } from '@/components/page-header';
import { PageLayout } from '@/components/page-layout';

const ListBoat = () => {
  const { data: boats } = useList({
    resource: 'boats',
  });

  const { translate } = useTranslation();
  const go = useGo();

  return (
    <PageLayout>
      <PageHeader title={translate('ListBoat.title')} />
      <Row gutter={16}>
        {boats?.data?.map((boat) => (
          <Col span={6} key={boat.id}>
            <Card
              hoverable
              style={{
                aspectRatio: 2 / 1,
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
              onClick={() => {
                go({ to: `/boats/${boat.id}/dashboard` });
              }}
            >
              <Card.Meta title={boat.name} description={boat.description} />
            </Card>
          </Col>
        ))}
        <Col span={6}>
          <Card
            hoverable
            style={{
              aspectRatio: 2 / 1,
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onClick={() => {
              go({ to: '/boats/add' });
            }}
          >
            <PlusOutlined style={{ fontSize: '32px', color: '#555' }} />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export { ListBoat };
