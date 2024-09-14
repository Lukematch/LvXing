import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import React from 'react'
import styles from './index.module.less';
import { ProCard } from '@ant-design/pro-components';
import LeftContent from './components/leftContent';
import Hobbies from './components/hobbies';

export default () => {
  const location = useLocation();
  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProCard className='mb-16' gutter={16} ghost wrap>
        {/* 左侧信息 */}
        <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 8, xl: 8 }} >
          <LeftContent />
        </ProCard>
        {/* 右侧信息 */}
        <ProCard
          colSpan={{ xs: 24, sm: 24, md: 24, lg: 16, xl: 16 }}
          tabs={{
            items: [
              {
                key: 'hobbies',
                label: '兴趣爱好',
                children: <Hobbies />,
              },
            ],
          }}
        />
      </ProCard>
  </>
}
