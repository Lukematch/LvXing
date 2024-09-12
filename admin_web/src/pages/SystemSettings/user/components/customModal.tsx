import { DrawerForm } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useState } from 'react';
import ViewModal from './viewModal';

const CustomModal = (
  props: {
    type: 'edit' | 'view' | 'add' | undefined,
    open: boolean,
    setOpen: any,
    record: any
  }
  ) => {
  const {type, open, setOpen, record} = props
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
        // form={form}
        autoFocusFirstInput
        drawerProps={{
          maskClosable: true,
          destroyOnClose: true,
          onClose: () => setOpen(false)
        }}
        submitTimeout={2000}
        // onFinish={handleFinish}
      >
      </DrawerForm>
    }
  </>
}

export default CustomModal