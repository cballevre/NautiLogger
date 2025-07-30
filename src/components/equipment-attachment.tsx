import {
  DeleteOutlined,
  DownloadOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useCreate, useDelete, useList, useTranslation } from '@refinedev/core';
import {
  Button,
  Card,
  Col,
  List,
  Row,
  Typography,
  Upload,
  type UploadProps,
} from 'antd';
import type { FC } from 'react';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat.tsx';
import { supabaseClient as supabase } from '@/utils/supabaseClient';

type Attachment = {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
};

type EquipmentAttachmentProps = {
  equipmentId?: string;
};

const EquipmentAttachment: FC<EquipmentAttachmentProps> = ({ equipmentId }) => {
  const { translate } = useTranslation();
  const { data: boat } = useCurrentBoat();

  const { data: attachments } = useList<Attachment>({
    resource: 'equipment_attachments',
    filters: [{ field: 'equipment_id', operator: 'eq', value: equipmentId }],
  });

  const { mutate: createAttachment } = useCreate<Attachment>({
    resource: 'equipment_attachments',
  });

  const { mutate: deleteAttachment } = useDelete();

  const uploadToSupabase: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    try {
      const uploadedFile = file as File;
      const filePath = `${boat?.data?.id}/equipments/${equipmentId}/attachments/${Date.now()}_${uploadedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from('boat_attachments')
        .upload(filePath, file, {
          upsert: false,
          contentType: uploadedFile.type,
        });

      if (uploadError) {
        throw new Error('Error uploading file: ' + uploadError.message);
      }

      createAttachment({
        values: {
          equipment_id: equipmentId,
          file_name: uploadedFile.name,
          file_path: filePath,
          file_type: uploadedFile.type,
        },
      });
      onSuccess?.('File uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      onError?.(error as Error);
    }
  };

  const onDownload = async (attachment: Attachment) => {
    const { data, error } = await supabase.storage
      .from('boat_attachments')
      .createSignedUrl(attachment.file_path, 3600);

    if (error) {
      console.error('Error creating signed URL:', error.message);
      return;
    }

    if (data?.signedUrl) {
      // Create a hidden link and trigger download in a new tab
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onDelete = async (attachment: Attachment) => {
    try {
      await supabase.storage
        .from('boat_attachments')
        .remove([attachment.file_path]);

      await deleteAttachment({
        resource: 'equipment_attachments',
        id: attachment.id,
      });
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  return (
    <section>
      <Typography.Title level={2}>
        {translate('equipments.attachments.title')}
      </Typography.Title>
      <List
        grid={{ gutter: 8, column: 1 }}
        itemLayout="horizontal"
        dataSource={attachments?.data || []}
        renderItem={(item) => (
          <List.Item>
            <Card style={{ width: '100%' }} size="small">
              <Row align="middle">
                <Col flex="auto">
                  <List.Item.Meta title={item.file_name} />
                </Col>
                <Col flex="none">
                  <Button
                    title={translate('common.download')}
                    icon={<DownloadOutlined />}
                    onClick={() => onDownload(item)}
                  />

                  <Button
                    title={translate('common.delete')}
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(item)}
                    style={{ marginLeft: '8px' }}
                    danger
                  />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <Upload
        accept="application/pdf"
        showUploadList={false}
        customRequest={uploadToSupabase}
      >
        <Button type="link" icon={<PaperClipOutlined />}>
          {translate('equipments.attachments.add')}
        </Button>
      </Upload>
    </section>
  );
};

export { EquipmentAttachment };
