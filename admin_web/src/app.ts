// 运行时配置
import { history } from 'umi';
// import LayoutTabs from '@/components/LayoutTabs';
// import {
//   HomeOutlined,
//   UserOutlined,
//   EnvironmentOutlined,
//   NotificationOutlined,
//   TeamOutlined,
//   ProfileOutlined,
//   SettingOutlined,
//   BellOutlined,
//   ProfileTwoTone,
//   ClusterOutlined,
// } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';




// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{ name: string }> {
  let name = JSON.parse(localStorage.getItem('user')!)?.username
  return { name };
}

export const layout = () => {
  return {
    title: 'LvXing',
    logo: '/favicon.ico',
    // footerRender: () => <Footer />
    menu: {
      locale: false,
    },
  };
}
// 路由守卫
export function onRouteChange({ location, routes }: any) {
  const token = localStorage.getItem('token');
  if (!token && location.pathname !== '/user/login') {
    history.push('/user/login');
  }
}

// tabs配置 getCustomTabs
export async function tabsLayout({ initialState }: any): Promise<any> {
  return {
    local: {},
    icons: {}
  }
}

export const getCustomTabs = (config: any) => {
  return Tabs
}