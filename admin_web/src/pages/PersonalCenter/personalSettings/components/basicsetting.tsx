import DrawerFormItem from '@/pages/SystemSettings/user/components/DrawerFormItem'
import { updateUser } from '@/pages/SystemSettings/user/server'
import { ProForm } from '@ant-design/pro-components'
import { history, useModel } from '@umijs/max'
import { message, notification } from 'antd';
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
            values.avatar = values?.file[0]?.response?.data?.url
            delete values?.file
            console.log(values);
            const editRes = await updateUser(values, user_id)
            if(editRes?.data?.success){
              history.push('/user/login')
              message.success('更新成功')
              notification.info({
                message: '信息变更',
                description: '个人信息已修改，请重新登录并验证:-)',
                duration: 5
              })
            } else {
              history.push('personalCenter/personalSettings')
              message.error(editRes?.data?.message)
            }
          }
        }
      }
    >
      <DrawerFormItem type='edit'/>
    </ProForm>
  </>
}

export default BasicSetting
