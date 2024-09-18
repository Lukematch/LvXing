import { ProForm } from '@ant-design/pro-components';
import React from 'react'

const ChangePassword = () => {
  return <>
    <ProForm
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      onFinish={async (values) => {
        console.log(values);
      }}
    >
    </ProForm>
  </>
}

export default ChangePassword