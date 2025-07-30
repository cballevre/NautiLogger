import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useDelete, useGo, useTranslation } from '@refinedev/core';
import { Button, Dropdown, type MenuProps, Modal } from 'antd';
import type { FC } from 'react';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import type { Equipment } from '@/shared/types/models';

interface EquipmentActionsMenuProps {
  equipment: Equipment;
}

export const EquipmentActionsMenu: FC<EquipmentActionsMenuProps> = ({
  equipment,
}) => {
  const { translate } = useTranslation();
  const { data: boat } = useCurrentBoat();
  const go = useGo();

  const { mutate: deleteEquipment } = useDelete();

  const handleDelete = () => {
    Modal.confirm({
      title: translate('equipments.delete.confirmTitle'),
      content: translate('equipments.delete.confirmContent'),
      okText: translate('common.delete'),
      cancelText: translate('common.cancel'),
      okType: 'danger',
      onOk: () => {
        deleteEquipment({
          resource: 'equipments',
          id: equipment.id,
        });
      },
    });
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'edit') {
      go({
        to: `/boats/${boat?.data?.id}/equipments/${equipment.id}/edit`,
      });
    } else if (key === 'delete') {
      handleDelete();
    }
  };

  const items: MenuProps['items'] = [
    {
      label: translate('common.edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: translate('common.delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <Button icon={<MoreOutlined />} title={translate('common.more')} />
    </Dropdown>
  );
};
