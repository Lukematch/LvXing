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
import { PageLoading, useIntl } from '@ant-design/pro-components';
import { renderMenuIcon } from '@/utils';

export const BasicLayout: RunTimeLayoutConfig = ({initialState, setInitialState}: InitDataType) => {
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
        // 根据需求处理从后端返回的数据
        const convertRoutes = (route: any) => {
          return {
            path: route.path,
            name: route.menuName,
            // 确保 icon 传递 若为父节点则直接渲染 子节点则传字符串在menuItemRender中渲染
            icon: !route.parentId? <div style={{color: '#aaa'}}>{renderMenuIcon(route?.icon?.toString())}</div> : route.icon,
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
            {icon && pro_layout_parentKeys?.length > 0 && <div style={{color: '#aaa', marginRight: '5px'}}>{renderMenuIcon(icon?.toString())}</div>}
              {/* 菜单名称 */}
            {defaultDom}
          </Space>
        );
      };
      return (
        <Link to={path!}>
          {renderMenuDom()}
        </Link>
      );
    },
  };
}