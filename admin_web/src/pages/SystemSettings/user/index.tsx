import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Table } from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import { ProTable } from '@ant-design/pro-components';

export default function () {
  const location = useLocation();
  return (
    <div>
      <div className={styles.breadCrumb}>
        <BreadCrumb location={location}/>
      </div>
      <ProTable
      className={styles.user}
      // columns={}
      />
    </div>
  )
}
