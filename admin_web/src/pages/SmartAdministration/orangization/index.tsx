import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import { Button, Card, Drawer, Form, Modal, Popconfirm, Table, message } from 'antd';
import { ActionType, DrawerForm, ProCard, ProFormField, ProTable } from '@ant-design/pro-components';
import { customColumns } from './columns';
import { addOrangization, deleteOrangization, getOrangizationList, updateOrangization } from './server';
import OrangizationFormItem from './components/orangizationFormItem'
import { v4 as uuidv4 } from 'uuid';

import {
  PlusOutlined
} from '@ant-design/icons'
import { waitTime } from '@/utils';

export type OrangizationType = {
  id: string;
  code?: string;
  name?: string;
  description?: string;
  logo?: string;
  parent_id?: string;
  class?: string;
  status?: string;
  leader?: string;
  sort?: string;
  create_time?: Date;
  update_time?: Date;
  children?: OrangizationType[];
}

export default () => {
  const location = useLocation();

  const [form] = Form.useForm();

  const actionRef = useRef<ActionType>();

  const [data, setData] = useState<OrangizationType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [modalType, setModalType] = useState<'add' | 'edit'>('add')
  const [open, setOpen] = useState<boolean>(false)

  // const files = Form.useWatch('file', form);

  // ProFormField获取数据展示
  const [dataSource, setDataSource] = useState<OrangizationType[]>()
  const fetchData = async () => {
    const data: any = await getOrangizationList();
    setDataSource(data)
  };
  useEffect(() => {
    fetchData()
  },[isLoading])
  // 正常可以不使用 此数据与ProTable无关

  const columns = customColumns.concat({
    title: '操作',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: (text, record, _, action) => [
      <Popconfirm key="delete" title="请确认是否修改状态" onConfirm={async ()=>{
        const status = record?.status === '禁用'? '正常' : '禁用'
        setIsLoading(true)
        await waitTime(1000)
        const { data } = await updateOrangization(record?.id, {status: status})
        data.code === 200 ? message.success('修改成功') : message.error('修改失败')
        actionRef?.current?.reload()
      }}>
        {record?.status === '禁用'? <Button type='link' key="disable">启用</Button> : <Button type='link' key="disable">禁用</Button>}
      </Popconfirm>,
      <Button disabled={record?.status === '禁用'} type='link' key="edit" onClick={handleEdit.bind(this, record, 'edit')}>编辑</Button>,
      <Popconfirm key="delete" title="确定删除吗？" onConfirm={handleDelete.bind(this, record?.id)}>
        <Button disabled={record?.status === '禁用'} type='link' danger >删除</Button>
      </Popconfirm>
    ]
  })

  // 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单 重置表单
		setOpen(false)
		// form.resetFields()
    // actionRef.current?.reload()
	}

  // 处理 新增-编辑-事件
  const handleEdit = (record: any, type: 'add' | 'edit') => {
    setOpen(true);
    setModalType(type);
    if (type === 'edit') {
      let file = {
        uid: uuidv4(),
        name: record?.logo?.substring(record?.logo?.lastIndexOf('/') + 1),
        status: 'done',
        url: record?.logo
      }
      record.file = (record?.logo === '' || record?.logo === null)? [] : [file]
      form.setFieldsValue(record)
    } else {
      form.resetFields();
    }
  }

  // 删除操作
  const handleDelete = async (id: string) => {
    setIsLoading(true)
    await waitTime(1000);
    const { data } = id && await deleteOrangization(id)
    data.code = 200 && message.success('删除成功')
    data.code !== 200 && message.error('删除失败')
    actionRef.current?.reload()
  }

  // 提交更新
  const handleFinish = async (values: any) => {
    setIsLoading(true)
    await waitTime(1000);

    const { file, ...rest } = values;

    if(modalType === 'add'){
      rest.logo = file?.[0]?.response?.data?.url
      // rest.id = 'lv' + Math.floor(Math.random() * 1000)
      rest.create_time = new Date()
      rest.update_time = new Date()
      addOrangization(rest).then((data: any) => {
        if(data.code === 200){
          message.success('保存成功')
          setOpen(false)
          // 刷新列表
          actionRef.current?.reload()
          return true
        } else {
          message.error(data.message)
        }
      })
    }
    if(modalType === 'edit'){
      rest.logo = file?.[0]?.response?.data?.url
      // 更新时间
      rest.update_time = new Date()
      updateOrangization(rest.id, rest).then((data: any) => {
        if(data.code === 200){
          message.success('保存成功')
          setOpen(false)
          // 刷新列表
          actionRef.current?.reload()
        } else {
          message.error(data.message)
        }
      })
    }
  }

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
    rowKey='id'
    headerTitle='组织管理'
    rowClassName={(record) =>
      record.status === '禁用' ? styles.disabledRow : ''
    }
    actionRef={actionRef}
    // onSubmit={(params) => {
    //   // console.log(params)
    // }}
    search={{
      labelWidth: 'auto',
    }
    }
    scroll={{
      x: 'max-content',
    }}
    pagination={{
      showSizeChanger: true,
      defaultCurrent: 1,
      size: 'default',
      showTotal: (total, range) => `显示条目 ${range[0]} - ${range[1]} 共 ${total} 条`
    }}
    className={styles.orangization}
    columns={columns}
    // expandable={{ expandedRowRender }}
    request={(params: any)=>{
      const {name, code} = params
      return getOrangizationList(name, code)
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
    <DrawerForm
    width={500}
    grid
    title={modalType === 'add' ? '新增组织' : '编辑组织'}
    open={open}
    form={form}
    autoFocusFirstInput
    drawerProps={{
      maskClosable: true,
      destroyOnClose: true,
      onClose: () => handlerClose()
    }}
    submitTimeout={2000}
    onFinish={handleFinish}
    >
      <OrangizationFormItem />
    </DrawerForm>

    <ProCard title="表格数据" headerBordered collapsible defaultCollapsed
    style={{marginBottom: 40}}
    >
      <ProFormField
        ignoreFormItem
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        mode="read"
        valueType="jsonCode"
        text={JSON.stringify(dataSource)}
      />
    </ProCard>
  </>
}
