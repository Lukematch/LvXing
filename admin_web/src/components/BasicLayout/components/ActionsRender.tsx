import { HeaderProps } from '@ant-design/pro-components'
import FullScreen from './FullScreen' // 全屏
import NoticeBell from './NoticeBell' // 消息铃铛

export default function actionsRender(props: HeaderProps) {
  // 判断是否侧边布局
  const isSide = props.layout === 'side'
  if (props.isMobile || typeof window === 'undefined') return [];
  return [
    // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
    //   <SearchInput />
    // ) : undefined,
    <NoticeBell key="NoticeBell" />,
    // 全屏
    <FullScreen key="FullScreen" />,
  ];
}