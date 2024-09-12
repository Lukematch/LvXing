import { useMount, useRequest, useUnmount } from 'ahooks';
import { Avatar, Badge, Button, Card, ConfigProvider, Dropdown, Empty, Input, List, Popover, Row, Spin, Tabs, Tooltip } from 'antd';
import { NotificationOutlined, SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
const GlobalSearch: FC = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const renderContent = (
    <Card bordered={false} style={{ boxShadow: 'none' }}>
      <Row>
        <Input placeholder="输入关键字搜索..."
          // variant="borderless"
          style={{color: '#aaa'}}
          prefix={<SearchOutlined />}
        />
      </Row>
      <Spin spinning={false}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Spin>
    </Card>
  );

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
    setClicked(false);
  };

  const handleClickChange = (open: boolean) => {
    setHovered(false);
    setClicked(open);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Popover: { titleMinWidth: 100, width: 100 }
          }
        }}
      >
        <Popover title={
          <Tooltip title='点击工具栏搜索框即可悬停'>
            <h4>全局搜索</h4>
          </Tooltip>
        }
        content={renderContent}
        trigger="hover"
        open={hovered}
        onOpenChange={handleHoverChange}
        >
          <Popover
          title='全局搜索'
          content={renderContent}
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
          >
            <Button type="text" style={{color: '#aaa'}} icon={<SearchOutlined />}/>
          </Popover>
        </Popover>
      </ConfigProvider>
    </>
  );
};
export default GlobalSearch;