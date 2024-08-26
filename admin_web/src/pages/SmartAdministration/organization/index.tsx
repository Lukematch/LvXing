import React from 'react'
import styles from './index.module.less'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import { Card, Table } from 'antd';
import { ProTable } from '@ant-design/pro-components';

export default function () {
  const location = useLocation();



  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
    className={styles.orangization}
    // columns={}
    />
  </>
}
