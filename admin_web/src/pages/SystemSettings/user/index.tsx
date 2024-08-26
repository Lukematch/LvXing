import React from 'react'
import styles from './index.module.less'
import { Table } from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';

export default function () {
  const location = useLocation();

  return (
    <div>
      <div className={styles.breadCrumb}>
        <BreadCrumb location={location}/>
      </div>
      <Table
      className={styles.user}
      // columns={}
      />
    </div>
  )
}
