import { useMount, useRequest, useUnmount } from 'ahooks';
import { Avatar, Badge, Button, Card, ConfigProvider, Dropdown, List, Popover, Spin, Tabs } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
const NoticeBell: FC = () => {
  const record = [
    {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: '你收到了 14 份新周报',
      name: '林东东',
    },
    {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      name: '曲丽丽',
    },
    {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: '这种模板可以区分多种通知类型',
      name: '林东东',
    },
  ]
  const renderContent = (
    <Card bordered={false} style={{ boxShadow: 'none' }}
    // styles={{ body: { padding: 0 } }}
    >
      <List
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
      />
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
        <Popover title='公告' content={renderContent}>
          <Badge size="small">
            <Button type="text" style={{color: '#aaa'}} icon={<NotificationOutlined />}/>
          </Badge>
        </Popover>
      </ConfigProvider>
    </>
  );
};
export default NoticeBell;