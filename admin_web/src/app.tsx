// 运行时配置
import { history, RunTimeLayoutConfig, useKeepOutlets,  } from 'umi';
import { BasicLayout } from '@/components/BasicLayout';
import { getMenuList, getUser, menuType } from './utils/server';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
// import { getRoutes } from '@/../config/router/getroutes';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{user?: any, name?: string, avatar?: string, Collapsed?: boolean, RouteMenu?: menuType[], loading?: boolean } | undefined> {
  const user =  JSON.parse(localStorage.getItem('user')!)

  if (user) {
    // let { data } = await getMenuList(user)
    return {
      user: user,
      name: user?.nickName,
      avatar: user?.avatar,
      // loading: false,
      // RouteMenu: data
    }
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
// export const getCustomTabs = () => <Tabs/>
