import BreadCrumb from '@/components/BreadCrumb'
import React from 'react'
import styles from './index.module.less'
import { useLocation } from '@umijs/max';
import { Empty } from 'antd';

export default () => {
  const location = useLocation();
  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <Empty description='暂未开放' image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  </>
}
