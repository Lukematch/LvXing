import { DrawerForm, ProList } from '@ant-design/pro-components'
import React, { useState } from 'react'
import Hobbies from '../../personalInformation/components/hobbies'
import { Button, Form } from 'antd'
import { Content } from 'antd/es/layout/layout'
import HobbyFormItem from './hobbyFormItem'
import { waitTime } from '@/utils'
import { useModel } from '@umijs/max'
import { updateHobby } from '../../personalInformation/server'

const HobbySetting = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<'add' | 'edit'>('edit')

  const { initialState, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm()

  const handleFinish = async (values: any) => {
    values.username = initialState?.name
    switch(type) {
      case 'add':
        // 新增
        {values?.file && (
          values.hobbyIcon = values?.file?.fileList[0]?.thumbUrl,
          delete values.file
        )}
        await updateHobby(values)
        break
      case 'edit':
        // 编辑
        await updateHobby(values)
        break
    }
    await waitTime(1000)
    setOpen(false)
  }

  return <>
    <Content className='mb-10'>
      <Button className='mb-5' onClick={() => {setOpen(true); setType('add'); form.resetFields()}}>✨新增兴趣爱好</Button>
      <Hobbies update={true} setOpen={setOpen} form={form}/>
    </Content>
    <DrawerForm
      width={500}
      grid
      title={type === 'add' ? '新增兴趣爱好' : '编辑兴趣爱好'}
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
      <HobbyFormItem />
    </DrawerForm>
  </>
}

export default HobbySetting