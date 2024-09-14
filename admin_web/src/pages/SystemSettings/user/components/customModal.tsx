import { DrawerForm } from '@ant-design/pro-components';
import { Form, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ViewModal from './viewModal';
import DrawerFormItem from './DrawerFormItem';
import { v4 as uuidv4 } from 'uuid';
import { updateUser } from '../server';
import { waitTime } from '@/utils';
import dayjs from 'dayjs';

const CustomModal = (
  props: {
    type: 'edit' | 'view' | 'add' | undefined,
    open: boolean,
    setOpen: any,
    record: any
  }
  ) => {
  const {type, open, setOpen, record} = props
  const [form] = Form.useForm()

  if(type === 'edit') {
    let file = {
      uid: uuidv4(),
      name: record?.avatar?.substring(record?.avatar?.lastIndexOf('/') + 1),
      status: 'done',
      url: record?.avatar
    }
    record.file = (record?.logo === '' || record?.logo === null)? [] : [file]
    form.setFieldsValue({...record, updateTime: dayjs()})
  }
  if(type === 'add') {
    form.resetFields()
  }

  const handleFinish = async (values: any) => {
    await waitTime(1000)
    const { file, ...rest } = values;
    rest.avatar = file?.[0]?.response?.data?.url
    switch(type) {
      case 'add':
        // 初始化默认面膜
        rest.password = '123456'
        const AddRes = await updateUser(rest)
        AddRes?.data?.success? message.success('更新成功') : message.error(AddRes?.data?.message)
        setOpen(false)
        break;
      case 'edit':
        const editRes = await updateUser(rest, record?.id)
        editRes?.data?.success? message.success('更新成功') : message.error(editRes?.data?.message)
        setOpen(false)
        break;
      default:
        break;
    }
  }

  return <>
    {
      props?.type && props?.type === 'view'?
      <ViewModal type={type} open={open} setOpen={setOpen} record={record} />
      :
      <DrawerForm
        width={500}
        grid
        title={type === 'add' ? '新增用户' : '编辑用户'}
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
        <DrawerFormItem type={type} record={record}/>
      </DrawerForm>
    }
  </>
}

export default CustomModal