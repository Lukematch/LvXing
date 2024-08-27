import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import BreadCrumb from '@/components/BreadCrumb'
import { useLocation } from '@umijs/max';
import { Button, Card, Drawer, Form, Modal, Table, message } from 'antd';
import { ActionType, DrawerForm, ProCard, ProFormField, ProTable } from '@ant-design/pro-components';
import { customColumns } from './columns';
import { addOrangization, getOrangizationList } from './server';
import OrangizationFormItem from './components/orangizationFormItem'

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

  const file = Form.useWatch('file', form);

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
    render: (text, record, _, action) => [
      <a key="edit" onClick={() => {setOpen(true); setModalType('edit')}}>编辑</a>,
      <a key="delete">删除</a>,
    ]
  })

  // 关闭抽屉浮层
	const handlerClose = () => {
		// 关闭表单 重置表单
		setOpen(false)
		// form.resetFields()
    // actionRef.current?.reload()
	}

  // 提交更新
  const handleFinish = async (values: any) => {
    setIsLoading(true)
    await waitTime(1000);

    const { file, ...rest } = values;
    console.log('Form values:', rest);
    console.log('Uploaded file:', file);
      // if(modalType === 'add'){
      //   console.log('add:'+result);
      //   console.log('@watch'+file);
      //   addOrangization(result).then((data: any) => {
      //     if(data){
      //       message.success('保存成功')
      //       setOpen(false)
      //       // 刷新列表
      //       actionRef.current?.reload()
      //       return true
      //     }
      //   })
      // }
      // if(result?.file && result?.file?.length > 0){
      //   let logo = result?.file[0]?.response?.fullFilePath
      //   delete result.file
      //   result.logo = logo
      // }
  }

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
    rowKey='id'
    headerTitle='组织管理'
    actionRef={actionRef}
    scroll={{
      x: 'max-content'
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
    request={getOrangizationList}
    toolBarRender={() => [
      <Button
      key="button"
      icon={<PlusOutlined />}
      onClick={() => {
        setOpen(true)
        setModalType('add')
      }}
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

    <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
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
