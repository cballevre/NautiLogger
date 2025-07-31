import {
  DeleteOutlined,
  DownloadOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useCreate, useDelete, useList, useTranslate } from '@refinedev/core';
import { Button, Card, Col, List, Row, Upload, type UploadProps } from 'antd';
import type { FC } from 'react';

import { useCurrentBoat } from '@/boats/hooks/use-current-boat';
import { supabaseClient as supabase } from '@/core/utils/supabaseClient';
import { SectionHeader } from '@/shared/components/section-header';
import type { EquipmentAttachment } from '@/shared/types/models';

export type AttachmentListProps = {
  resource: string;
  resourceId?: string;
};

const AttachmentList: FC<AttachmentListProps> = ({ resource, resourceId }) => {
  const translate = useTranslate();
  const { data: boat } = useCurrentBoat();

  const attachmentResource = `${resource}_attachments`;
  const boatAttachmentBucket = 'boat_attachments';
  const resourceForeignKey = `${resource}_id`;

  const { data: attachments } = useList<EquipmentAttachment>({
    resource: attachmentResource,
    filters: [{ field: resourceForeignKey, operator: 'eq', value: resourceId }],
  });

  const { mutate: createAttachment } = useCreate({
    resource: attachmentResource,
  });

  const { mutate: deleteAttachment } = useDelete();

  const uploadToSupabase: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    try {
      const uploadedFile = file as File;
      const filePath = `${boat?.data?.id}/${resource}s/${resourceId}/attachments/${Date.now()}_${uploadedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from(boatAttachmentBucket)
        .upload(filePath, file, {
          upsert: false,
          contentType: uploadedFile.type,
        });

      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }

      createAttachment({
        values: {
          [resourceForeignKey]: resourceId,
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

  const onDownload = async (attachment: EquipmentAttachment) => {
    const { data, error } = await supabase.storage
      .from(boatAttachmentBucket)
      .createSignedUrl(attachment.file_path, 3600);

    if (error) {
      console.error(`Error creating signed URL: ${error.message}`);
      return;
    }

    if (data?.signedUrl) {
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onDelete = async (attachment: EquipmentAttachment) => {
    try {
      await supabase.storage
        .from(boatAttachmentBucket)
        .remove([attachment.file_path]);

      await deleteAttachment({
        resource: attachmentResource,
        id: attachment.id,
      });
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  return (
    <section>
      <SectionHeader title={translate('shared.attachments.title')} />
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
                    title={translate('shared.attachments.download')}
                    icon={<DownloadOutlined />}
                    onClick={() => onDownload(item)}
                  />
                  <Button
                    title={translate('shared.attachments.delete')}
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
          {translate('shared.attachments.add')}
        </Button>
      </Upload>
    </section>
  );
};

export { AttachmentList };
