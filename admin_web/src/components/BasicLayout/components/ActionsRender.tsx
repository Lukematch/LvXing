import { HeaderProps } from '@ant-design/pro-components'
import FullScreen from './FullScreen' // 全屏
import NoticeBell from './NoticeBell' // 消息铃铛
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import GlobalSearch from './GlobalSearch';

export default function actionsRender(props: HeaderProps) {
  // 判断是否侧边布局
  const isSide = props.layout === 'side'
  if (props.isMobile || typeof window === 'undefined') return [
      <Input
      // prefix={<SearchOutlined />}
      placeholder="Search"
      // onSearch={handleSearch}
    />
  ];
  return [
    // 全局搜索
    <GlobalSearch key="GlobalSearch" />,
    // 公告
    <NoticeBell key="NoticeBell" />,
    // 全屏
    <FullScreen key="FullScreen" />,
  ];
}