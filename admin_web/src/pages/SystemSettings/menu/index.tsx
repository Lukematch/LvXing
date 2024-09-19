import BreadCrumb from '@/components/BreadCrumb'
import styles from './index.module.less'
import { ActionType, DrawerForm, ProCard, ProFormField, ProTable } from '@ant-design/pro-components';

export default function () {
  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
    />
  </>
}
