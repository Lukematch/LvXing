// 运行时配置
import { history, RunTimeLayoutConfig, useKeepOutlets,  } from 'umi';
import { BasicLayout } from '@/components/BasicLayout';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{ name: string, avatar: string } | undefined> {
  let name = JSON.parse(localStorage.getItem('user')!)?.username
  let avatar = "https://pic.imge.cc/2024/08/13/66bb0e4443c63.jpg"
  return {
    name,
    avatar
  }
}

export const layout = BasicLayout
// 路由守卫
export function onRouteChange({ location, routes }: any) {
  const token = localStorage.getItem('token');
  if (!token && location.pathname !== '/user/login') {
    history.push('/user/login');
  }
}

// tabs配置
export async function tabsLayout({ initialState }: any): Promise<any> {
  return {
    local: {},
    icons: {}
  }
}
// getCustomTabs
// export const getCustomTabs = (config: any) => <Tabs {...config} />