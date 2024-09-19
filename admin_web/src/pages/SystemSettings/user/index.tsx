import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Button, Dropdown, Form, MenuProps, Popconfirm, Space, Table, message, notification } from 'antd'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { customColumns } from './columns';
import { deleteUser, getUserList, resetPassword, updateUser } from './server';
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
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification();
  const actionRef = useRef<ActionType>();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [type, setType] = useState<'edit' | 'view' | 'add'>('view')
  const [open, setOpen] = useState<boolean>(false)
  const [record, setRecord] = useState<any>()

  useEffect(()=>{
    setIsLoading(true)
    actionRef?.current?.reload()
  }, [open])

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
            <Button style={{color: '#16c8c8'}} type='link' key="view" onClick={handleView.bind(this, record)}>查看详情</Button>
          ),
        },
        {
          key: '2',
          label: (
            <Button style={{color: 'orange'}} type='link' key="edit" onClick={handleEdit.bind(this, record, 'edit')}>编辑</Button>
          ),
          // icon: <SmileOutlined />,
          // disabled: true,
        },
        {
          key: '3',
          label: (
            <Popconfirm key="reloadPw" title={`确定重置用户${record?.username}密码？`} onConfirm={handleReloadPw.bind(this, record?.id)}>
              <Button type='link'>重置密码</Button>
            </Popconfirm>
          ),
        },
        {
          key: '4',
          label: (
            <Popconfirm key="delete" title={`确定删除${record?.username}？`} onConfirm={handleDelete.bind(this, record?.id)}>
              <Button type='link' danger >删除</Button>
            </Popconfirm>
          ),
          // disabled: true,
        }
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
  const handleReloadPw = async (id: number) => {
    const { data } = await resetPassword('123456', id)
    data?.success? api['success']({
      // showProgress: true,
      // pauseOnHover: true,
      message: '信息变更',
      description: '密码重置成功！',
      duration: 5
    }) : message.error(data?.message)
  }
  const handleDelete = async (id: number) => {
    // console.log(id);
    const { data } = await deleteUser(id)
    data?.code === 200? message.success(data?.message) : message.error(data?.message)
    actionRef?.current?.reload()
  }

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    {contextHolder}
    <ProTable
    rowKey='id'
    headerTitle='用户管理'
    className={styles.user}
    columns={columns}
    loading={isLoading}
    scroll={{
      x: 'max-content'
    }}
    actionRef={actionRef}
    request={(params: any) => {
      const {username, nickName, role} = params
      return getUserList(username, nickName, role)
    }}
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
    <Form form={form}>
      <CustomModal type={type} open={open} setOpen={setOpen} record={record}/>
    </Form>
  </>
}
