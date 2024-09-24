import BreadCrumb from '@/components/BreadCrumb'
import styles from './index.module.less'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { customColumns } from './columns';
import { deleteRole, getRoleList } from './server';
import { useRef, useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import CustomModal from './component/customModal';

export type roleType = {
  id?: number;
  name: string;
  code: string;
  createTime?: Date;
  updateTime?: Date;
}

export default () => {

  const actionRef = useRef<ActionType>()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<'add' | 'edit'>('add')
  const [currentRecord, setCurrentRecord] = useState<roleType>({} as roleType)
  const [rowId, setRowId] = useState<number>(0)

  const columns: ProColumns<roleType>[] = customColumns().concat({
    title: '操作',
    valueType: 'option',
    width: 120,
    render: (text, record, _, action) => [
      <a key="edit" onClick={() => {setOpen(true);setType('edit');setCurrentRecord(record);setRowId(record.id as number)}}>编辑</a>,
      <Popconfirm
        title='确定删除吗？'
        key="delete"
        onConfirm={async () => {
          const { data } = await deleteRole(record.id as number)
          data?.success? message.success(data?.message): message.error(data?.message)
          action?.reload()
        }}
      >
        <a>删除</a>
      </Popconfirm>
    ],
  })
  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
      className={styles.role}
      columns={columns}
      headerTitle='角色管理'
      tooltip='编号 1~3 为默认角色，不可删除！'
      rowKey='id'
      search={false}
      actionRef={actionRef}
      request={getRoleList}
      toolBarRender={() =>[
        <Button key="add" onClick={() => {setOpen(true);setType('add')}}>新增</Button>,
      ]}
    />
    <CustomModal
      rowId={rowId}
      open={open}
      setOpen={setOpen}
      type={type}
      currentRecord={currentRecord}
      actionRef={actionRef}
    />
  </>
}
