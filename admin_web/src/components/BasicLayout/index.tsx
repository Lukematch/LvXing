import React from 'react'
import CustomFooter from '../Footer';
import { Space } from 'antd';
import { InitDataType, Link, RunTimeLayoutConfig } from '@umijs/max';
import {
  actionsRender,
  avatarProps,
} from './components';
import { getRoutes } from '@/../config/router/getroutes';
import { iconMap } from '@/services/icon';
import Layout from '@/.umi/plugin-layout/Layout';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { useIntl } from '@ant-design/pro-components';

export const BasicLayout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}: InitDataType) => {
  const renderMenuIcon = (icon: string | null | undefined) => {
    return <div style={{color: '#aaa'}}>
      {iconMap[icon!]}
    </div>;
  };
  const renderMenuItemIcon = (icon: string | null | undefined) => {
    return <div style={{color: '#aaa', marginRight: '5px'}}>
      {iconMap[icon!]}
    </div>;
  }
  return {
    title: 'LvXing',
    logo: '/favicon.ico',
    waterMarkProps: {
      content: 'Luke'
    },
    actionsRender,
    avatarProps: avatarProps(),
    // rightContentRender: () => <RightContent/>,
    footerRender: ( )=> <CustomFooter />,
    menu: {
      request: async () => {
        const routes = await getRoutes();
        // console.log(routes);
        // 根据需求处理从后端返回的数据
        const convertRoutes = (route: any) => {
          // console.log(route);
          // console.log('Route icon:', route.icon);
          return {
            path: route.path,
            name: route.menuName,
            // 确保 icon 传递，若为 null 则设置为 null
            icon: !route.parentId? renderMenuIcon(route?.icon?.toString()) : route.icon,
            // 递归处理子菜单
            routes: route.routes ? route.routes.map(convertRoutes) : [],
          };
        };
        return routes?.map(convertRoutes);
      },
    },
    // 自定义的 menuItemRender 函数
    menuItemRender: ({ icon, path, pro_layout_parentKeys }, defaultDom) => {
      const renderMenuDom = () => {
        return (
          <Space size={4}>
            {/* 调用 renderMenuIcon 函数渲染图标 */}
            {icon && pro_layout_parentKeys?.length > 0 && renderMenuItemIcon(icon?.toString())}
            {defaultDom}  {/* 菜单名称 */}
          </Space>
        );
      };
      return (
        <Link to={path!}>
          {renderMenuDom()}
        </Link>
      );
    },
    // subMenuItemRender: ({ icon, path = '', pro_layout_parentKeys, isUrl }, defaultDom) => {
    //   return (
    //     <Space size={4}>
    //       {icon && renderMenuIcon(icon?.toString())}
    //       {defaultDom}
    //     </Space>
    //   );
    // },

  };
}
