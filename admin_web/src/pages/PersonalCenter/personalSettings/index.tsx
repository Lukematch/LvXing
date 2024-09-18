import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import React, { useState } from 'react'
import styles from './index.module.less';
import { ProCard } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import BasicSetting from './components/basicsetting';
import HobbySetting from './components/hobbysetting';
import ChangePassword from './components/changepassword';

enum TABSKEY {
  BASIC = 'basic-setting', // 基本设置
  HOBBY = 'hobbies-setting', // 兴趣爱好设置
  PASSWORD = 'change-password', // 修改密码
}

export default () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string>(TABSKEY.BASIC)

  const tabsItems = [
    {
      label: '基本设置',
      key: TABSKEY.BASIC,
      children: <BasicSetting />,
    },
    {
      label: '兴趣爱好',
      key: TABSKEY.HOBBY,
      children: <HobbySetting />,
    },
    {
      label: '修改密码',
      key: TABSKEY.PASSWORD,
      children: <ChangePassword />,
    },
  ]


  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProCard className={styles.content}>
      <Tabs
      tabPosition='left'
      activeKey={activeKey}
      items={tabsItems}
      onTabClick={(key) => setActiveKey(key)}
      />
    </ProCard>
  </>
}
