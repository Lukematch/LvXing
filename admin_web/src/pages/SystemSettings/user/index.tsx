import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Button, Dropdown, MenuProps, Popconfirm, Space, Table } from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import { ProTable } from '@ant-design/pro-components';
import { customColumns } from './columns';
import { getUsertList } from './server';
import { waitTime } from '@/utils';
import {
  DownOutlined,
  SmileOutlined,
  PlusOutlined
} from '@ant-design/icons'
import CustomModal from './components/customModal'

export type UserType = {
  id: number;
  index: number;
  username?: string;
  password?: string;
  nickName?: string;
  avatar?: string;
  email?: string;
  role?: string;
  salt?: string;
  createTime?: Date;
  updateTime?: Date;
}

export default () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [type, setType] = useState<'edit' | 'view' | 'add'>('view')
  const [open, setOpen] = useState<boolean>(false)
  const [record, setRecord] = useState<any>()

  const columns = customColumns.concat({
    title: '操作',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: (text, record, _, action) => {
      const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Button type='link' key="edit" onClick={handleView.bind(this, record)}>查看详情</Button>
          ),
        },
        {
          key: '2',
          label: (
            <Button type='link' key="edit" onClick={handleEdit.bind(this, record, 'edit')}>编辑</Button>
          ),
          // icon: <SmileOutlined />,
          // disabled: true,
        },
        {
          key: '3',
          label: (
            <Popconfirm key="delete" title={`确定删除${record?.username}吗？`} onConfirm={handleDelete.bind(this, record?.id)}>
              <Button type='link' danger >删除</Button>
            </Popconfirm>
          ),
          // disabled: true,
        },
        // {
        //   key: '4',
        //   danger: true,
        //   label: 'a danger item',
        // },
      ];
      return [
        <Dropdown menu={{ items }}>
          <Button>
            操作
            <DownOutlined />
          </Button>
        </Dropdown>
      ]
    }
  })

  const handleView = (record: any) => {
    setOpen(true)
    setType('view')
    setRecord(record)
  }
  const handleEdit = (record: any, type: 'add' | 'edit') => {
    setOpen(true)
    setType(type)
    setRecord(record)
  }
  const handleDelete = async (id: number) => {
    console.log(id);
  }

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
    rowKey='id'
    headerTitle='用户管理'
    className={styles.user}
    columns={columns}
    loading={isLoading}
    request={getUsertList}
    onLoad={async ()=>{
      await waitTime(1000).then(()=>{
        setIsLoading(false)
      })
    }}
    toolBarRender={() => [
      <Button
      key="button"
      icon={<PlusOutlined />}
      onClick={handleEdit.bind(this, null, 'add')}
      type="primary"
      >
        新建
      </Button>
      ]}
    />
    <CustomModal type={type} open={open} setOpen={setOpen} record={record}/>
  </>
}
