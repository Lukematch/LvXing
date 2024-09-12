import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import React from 'react'
import styles from './index.module.less';

export default () => {
  const location = useLocation();
  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
  </>
}
