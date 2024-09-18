import DrawerFormItem from '@/pages/SystemSettings/user/components/DrawerFormItem'
import { updateUser } from '@/pages/SystemSettings/user/server'
import { ProForm } from '@ant-design/pro-components'
import { useModel } from '@umijs/max'
import { message } from 'antd';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const BasicSetting = () => {
  const { initialState, setInitialState } = useModel('@@initialState')

  return <>
    <ProForm
      className='w-1/2 mb-10'
      grid
      request={async () => {
        const user = initialState?.user
        let file = {
          uid: uuidv4(),
          name: user?.avatar?.substring(user?.avatar?.lastIndexOf('/') + 1),
          status: 'done',
          url: user?.avatar
        }
        user.file = (user?.avatar === '' || user?.avatar === null)? [] : [file]
        user.updateTime = dayjs()
        return user
      }}
      onFinish={
        async (values) => {
          const user_id = initialState?.user?.id
          if (values && user_id) {
            const editRes = await updateUser(values, user_id)
            editRes?.data?.success? message.success('更新成功') : message.error(editRes?.data?.message)
          }
        }
      }
    >
      <DrawerFormItem type='edit'/>
    </ProForm>
  </>
}

export default BasicSetting
