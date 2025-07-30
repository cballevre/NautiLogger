import { PlusOutlined } from '@ant-design/icons';
import { Link, useList, useTranslation } from '@refinedev/core';
import { Card, Col, Row } from 'antd';

import { PageHeader } from '@/shared/components/page-header';
import { PageLayout } from '@/shared/components/page-layout';

const ListBoat = () => {
  const { data: boats } = useList({
    resource: 'boats',
  });

  const { translate } = useTranslation();

  return (
    <PageLayout>
      <PageHeader title={translate('ListBoat.title')} />
      <Row gutter={[16, 16]}>
        {boats?.data?.map((boat) => (
          <Col xs={24} sm={12} md={6} key={boat.id}>
            <Link to={`/boats/${boat.id}/dashboard`}>
              <Card hoverable>
                <Card.Meta title={boat.name} description={boat.description} />
              </Card>
            </Link>
          </Col>
        ))}
        <Col xs={24} sm={12} md={6}>
          <Link to="/boats/add">
            <Card hoverable style={{ textAlign: 'center' }}>
              <PlusOutlined style={{ fontSize: 24 }} />
              <span style={{ marginLeft: 16 }}>
                {translate('ListBoat.add')}
              </span>
            </Card>
          </Link>
        </Col>
      </Row>
    </PageLayout>
  );
};

export { ListBoat };
