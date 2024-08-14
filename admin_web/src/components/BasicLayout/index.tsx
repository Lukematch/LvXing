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
    /* 自定义面包屑 */
    breadcrumbProps: {
      itemRender: (route: any) => {
        console.log(route);
        return (
          <Space>
            {/* <Icon icon={MenuRemixIconMap[route.linkPath as ROUTES]} /> */}
            <span>{route.breadcrumbName}</span>
          </Space>
        );
      },
    },
  };
}
