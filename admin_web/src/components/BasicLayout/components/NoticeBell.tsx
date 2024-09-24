import { useMount, useRequest, useUnmount } from 'ahooks';
import { Avatar, Badge, Button, Card, ConfigProvider, Dropdown, Empty, List, Popover, Spin, Tabs } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
const NoticeBell: FC = () => {
  const record:any = []
  const renderContent = (
    <Card bordered={false} style={{ boxShadow: 'none' }}
    // styles={{ body: { padding: 0 } }}
    >
      {/* <List
        itemLayout="horizontal"
        // dataSource={get(announcementList, 'list', [])}
        dataSource={record}
        pagination={{
          position: 'bottom',
          align: 'center',
          size: 'small',
          // total: get(announcementList, 'total', 0),
          hideOnSinglePage: true
        }}
        renderItem={(record: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar} />}
              title={
                <Badge dot offset={[5, 5]}>
                  <a
                    onClick={() => {
                      
                    }}
                  >
                    {record.title}
                  </a>
                </Badge>
              }
              description={record.name}
            />
          </List.Item>
        )}
      /> */}
      <Empty description='暂未开放' image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Card>
  );

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Popover: { titleMinWidth: 300 },
            Tabs: { horizontalMargin: '0' },
          },
        }}
      >
        <Popover
        // title='公告'
        content={renderContent}>
          <Badge size="small">
            <Button type="text" style={{color: '#aaa'}} icon={<NotificationOutlined />}/>
          </Badge>
        </Popover>
      </ConfigProvider>
    </>
  );
};
export default NoticeBell;