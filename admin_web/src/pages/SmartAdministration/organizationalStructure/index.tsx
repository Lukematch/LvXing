import BreadCrumb from '@/components/BreadCrumb'
import React from 'react'
import { useLocation } from '@umijs/max';
import styles from './index.module.less';
import CustomCharts from '@/pages/InstructionPanel/workbench/components/customCharts';
import { Card } from 'antd';


export default function () {
  const location = useLocation();

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <div className={styles.content}>
      <CustomCharts type='graph_org' width={'auto'} height={600} />
    </div>
  </>
}
