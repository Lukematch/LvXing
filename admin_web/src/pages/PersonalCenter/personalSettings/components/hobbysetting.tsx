import { DrawerForm, ProList } from '@ant-design/pro-components'
import React, { useState } from 'react'
import Hobbies from '../../personalInformation/components/hobbies'
import { Button, Form, message } from 'antd'
import { Content } from 'antd/es/layout/layout'
import HobbyFormItem from './hobbyFormItem'
import { waitTime } from '@/utils'
import { history, useModel } from '@umijs/max'
import { updateHobby } from '../../personalInformation/server'

const HobbySetting = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [type, setType] = useState<'add' | 'edit'>('edit')

  const [nowId, setNowId] = useState<number | undefined>(undefined)

  const [refreshKey, setRefreshKey] = useState<number>(0);

  // const { initialState, setInitialState } = useModel('@@initialState');

  // const [updatedItem, setUpdatedItem] = useState<any>({})

  const [form] = Form.useForm()

  const handleFinish = async (values: any) => {
    // values.username = initialState?.name
    delete values.type
    values?.file && (
      values.hobbyIcon = values?.file[0]?.response?.data?.url,
      delete values.file
    )
    switch(type) {
      case 'add':
        // 新增
        const { data: addData } = await updateHobby(values)
        addData?.success? message.success('更新成功！') : message.error(addData?.message)
        setRefreshKey((prevKey) => prevKey + 1);
        break;
      case 'edit':
        // 编辑
        const { data: editData } = await updateHobby(values, nowId)
        editData?.success? message.success('更新成功！') : message.error(editData?.message)
        setRefreshKey((prevKey) => prevKey + 1);
        break;
    }
    await waitTime(1000)
    setOpen(false)
    setRefreshKey(prevKey => prevKey + 1);
  }

  return <>
    <Content className='mb-10'>
      <Button className='mb-5' onClick={() => {setOpen(true); setType('add'); form.resetFields()}}>✨新增兴趣爱好</Button>
      <Hobbies update={true} setOpen={setOpen} form={form} setType={setType} setNowId={setNowId} refreshKey={refreshKey} setRefreshKey={setRefreshKey}/>
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