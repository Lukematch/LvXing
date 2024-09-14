import { HeaderProps } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Dropdown, MenuProps, message } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import {
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
// import { useKeepOutlets } from '@umijs/max';


export default function AvatarProps(): HeaderProps['avatarProps'] {
  // 获取全局状态
  const { initialState, setInitialState, refresh } = useModel('@@initialState');

  const logOutClick = async () => {
    try{
      refresh()
      localStorage.clear()
      history.push('/user/login')
      message.success('退出登录成功')
    } catch (error) {
      message.error('退出登录失败');
    }
  };
  // 点击下拉菜单回调
  const onMenuClick = (event: MenuInfo) => {
    switch (event.key) {
      // 跳转至个人中心
      case 'personalCenter':
        history.push('/personalCenter/personalInformation');
        break;
      // 退出登录
      case 'logout':
        logOutClick();
        break;
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'personalCenter',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  return {
    src: initialState?.avatar,
    title: initialState?.name,
    render: (_, user) => {
      return <Dropdown menu={{ onClick: onMenuClick, items: menuItems }}>{user}</Dropdown>;
    },
  };
}