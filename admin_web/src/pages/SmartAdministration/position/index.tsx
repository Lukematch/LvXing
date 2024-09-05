import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { ActionType, DrawerForm, ProCard, ProFormField, ProTable } from '@ant-design/pro-components';
import { Button, Form, Popconfirm, message } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import { useLocation } from '@umijs/max';
import BreadCrumb from '@/components/BreadCrumb';
import { customColumns } from './columns';
import { waitTime } from '@/utils';
import {
  getPositionList,
  deletePosition,
  updatePosition,
  addPosition
} from './server';
import PositionFormItem from './components/positionFormItem';

export type PositionType = {
  id?: string;
  name: string;
  parent_id?: string;
  affiliated_org?: string;
  status?: string;
  leader?: string;
  sort?: string;
  description?: string;
  create_time?: Date;
  update_time?: Date;
  children?: PositionType[];
}

export default () => {

  const location = useLocation();
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false);

  const [saveId, setSaveId] = useState<string>('')
  const [modalType, setModalType] = useState<'add' | 'edit'>('add')

  // ProFormField获取数据展示
  const [dataSource, setDataSource] = useState<PositionType[]>([])
  const fetchData = async () => {
    const data: any = await getPositionList();
    setDataSource(data)
  };
  useEffect(() => {
    // 获取岗位列表
    fetchData()
  }, [isLoading])
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
        const { data } = await updatePosition(record.id!, {status: status})
        data.code === 200 ? message.success('修改成功') : message.error('修改失败')
        actionRef?.current?.reload()
      }}>
        {record?.status === '禁用'? <Button type='link' key="disable">启用</Button> : <Button type='link' key="disable">禁用</Button>}
      </Popconfirm>,
      <Button disabled={record?.status === '禁用'} type='link' key="edit" onClick={handleEdit.bind(this, record, 'edit')}>编辑</Button>,
      <Popconfirm key="delete" title="确定删除吗？" onConfirm={handleDelete.bind(this, record.id!)}>
        <Button disabled={record?.status === '禁用'} type='link' danger >删除</Button>
      </Popconfirm>
    ]
  })


  // 处理 新增-编辑-事件
  const handleEdit = (record: any, type: 'add' | 'edit') => {
    setOpen(true);
    setModalType(type);
    if (type === 'edit') {
      setSaveId(record?.id)
      form.setFieldsValue(record)
    } else {
      form.resetFields();
    }
  }

  // 删除操作
  const handleDelete = async (id: string) => {
    setIsLoading(true)
    await waitTime(1000);
    const { data } = id && await deletePosition(id)
    data.code = 200 && message.success('删除成功')
    data.code !== 200 && message.error('删除失败')
    actionRef.current?.reload()
  }

  // 提交更新
  const handleFinish = async (values: any) => {
    setIsLoading(true)
    await waitTime(1000);

    if(modalType === 'add'){
      values.create_time = new Date()
      values.update_time = new Date()
      addPosition(values).then((data: any) => {
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
      // 更新时间
      values.update_time = new Date()
      updatePosition(saveId, values).then((data: any) => {
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
    loading={isLoading}
    rowKey='id'
    headerTitle='岗位管理'
    rowClassName={(record) =>
      record.status === '禁用' ? styles.disabledRow : ''
    }
    actionRef={actionRef}
    // onSubmit={(params) => {
    //   // console.log(params)
    // }}
    search={{
      labelWidth: 'auto',
    }}
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
    request={(params: any)=>{
      const {name, affiliated_org} = params
      return getPositionList(name, affiliated_org)
    }}
    onLoad={async ()=>{
      await waitTime(1000).then(()=>{
        setIsLoading(false)
      })
    }}
    onRequestError={()=>{
      setIsLoading(false)
      message.error('数据请求失败')
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
    title={modalType === 'add' ? '新增岗位' : '编辑岗位'}
    open={open}
    form={form}
    autoFocusFirstInput
    drawerProps={{
      maskClosable: true,
      destroyOnClose: true,
      onClose: () => setOpen(false)
    }}
    submitTimeout={2000}
    onFinish={handleFinish}
    >
      <PositionFormItem />
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
