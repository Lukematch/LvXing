import { changePassword } from '@/pages/SystemSettings/user/server';
import { ProForm, ProFormText  } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Form, message, notification } from 'antd';

const ChangePassword = () => {

  const [form] = Form.useForm()
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleFinish = async (values: any) => {
    const { data } = await changePassword(values, initialState?.user?.id)
    if (data?.success) {
      message.success('修改成功！')
      history.push('/user/login')
      notification.info({
        message: '信息变更',
        description: '密码已修改，请重新登录验证！',
        duration: 5
      })
    } else {
      message.error(data?.message)
      form.resetFields()
    }
  }
  return <>
    <ProForm
    form={form}
    className='w-1/2'
    initialValues={{ remember: true }}
    onFinish={handleFinish}
    >
    <ProFormText.Password
    name="oldPassword"
    label="旧密码"
    placeholder='请输入旧密码'
    fieldProps={{
      showCount: true,
      maxLength: 24,
      minLength: 6,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('不能为空！'))
          } else if (value.length < 6) {
            return Promise.reject(new Error('密码长度不能小于6位！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    <ProFormText.Password
    name="newPassword"
    label="新密码"
    placeholder='请输入新密码'
    fieldProps={{
      showCount: true,
      maxLength: 24,
      minLength: 6,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('不能为空！'))
          } else if (value.length < 6) {
            return Promise.reject(new Error('密码长度不能小于6位！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    <ProFormText.Password
    name="oldDoublePw"
    label="重复新密码"
    placeholder='请再次输入一遍新密码'
    fieldProps={{
      showCount: true,
      maxLength: 24,
      minLength: 6,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('不能为空！'))
          } else if (value !== form.getFieldValue('newPassword')) {
            return Promise.reject(new Error('两次输入的密码不一致！'))
          } else if (value.length < 6) {
            return Promise.reject(new Error('密码长度不能小于6位！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    </ProForm>
    </>
}

export default ChangePassword