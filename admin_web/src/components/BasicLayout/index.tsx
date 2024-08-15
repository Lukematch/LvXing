import React from 'react'
import CustomFooter from '../Footer';
import { Space } from 'antd';
import { InitDataType, RunTimeLayoutConfig } from '@umijs/max';
import {
  actionsRender,
  avatarProps,

} from './components';

export const BasicLayout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}: InitDataType) => {

  return {
    title: 'LvXing',
    logo: '/favicon.ico',
    menu: {
      locale: false,
    },
    waterMarkProps: {
      content: 'Luke'
    },
    actionsRender,
    avatarProps: avatarProps(),
    // rightContentRender: () => <RightContent/>,
    footerRender: ( )=> <CustomFooter />,
    // onPageChange: ({ pathname = '' }) => {
    //   // 如果没有登录，重定向到 login
    //   if (!ACCESS_TOKEN && !eq(pathname, ROUTES.LOGIN)) {
    //     history.push(ROUTES.LOGIN);
    //   }
    //   // 中文状态下，绑定 umami 事件
    //   if (eq(getLocale(), 'zh-CN') && !eq(pathname, '/')) {
    //     umami.track(formatMessage({ id: formatPerfix(pathname, '', true) }));
    //   }
    // },
    // menu: {
    //   request: async () => initialState?.RouteMenu,
    // },
    /* 自定义面包屑 */
    // breadcrumbProps: {
    //   itemRender: (route) => {
    //     return (
    //       <Space>
    //         <Icon icon={MenuRemixIconMap[route.linkPath as ROUTES]} />
    //         <span>{route.breadcrumbName}</span>
    //       </Space>
    //     );
    //   },
    // },
    /* 自定义菜单项的 render 方法 */
    // menuItemRender: ({ icon, pro_layout_parentKeys, isUrl, path }, defaultDom) => {

    // },
    // 自定义拥有子菜单菜单项的 render 方法
    // subMenuItemRender: ({ icon, path = '' }) => {
      
    // },
    // 菜单的折叠收起事件
    // onCollapse: (collapsed) => {
    //   setInitialState((s: InitialStateTypes) => ({ ...s, Collapsed: collapsed }));
    // },
  };
}
