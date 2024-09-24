import { DrawerForm } from '@ant-design/pro-components';
import ViewModal from './viewModal';
import { Form, message } from 'antd';
import EditModalItem from './editModalItem';
import { updateMenu } from '../server';
import { useState } from 'react';
import { waitTime } from '@/utils';

const MenuForm = (props:{
  open: boolean,
  setOpen: any,
  modalType: 'add' | 'edit' | 'view' | undefined,
  record: any,
  form: any,
  saveId: number | undefined,
}) => {
  const { open, setOpen, modalType, record, form, saveId } = props;
  // const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleFinish = async (values: any) => {
    setLoading(true)
    switch(modalType){
      case 'add':
        // console.log(values);
        const { data: addData } = await updateMenu(values);
        addData.success?
          message.success(addData.message)
          : message.error(addData.message)
        break;
      case 'edit':
        const { data: editData } = await updateMenu(values, saveId);
        editData.success?
          message.success(editData.message + ', 请刷新页面重新获取菜单项...')
          : message.error(editData.message)
      default:
        break;
    }
    await waitTime(1000)
    setLoading(false)
    setOpen(false)
  }
  return <>
    {props?.modalType === 'view'?<ViewModal type={modalType} open={open} setOpen={setOpen} record={record}/> :
      <DrawerForm
      width={500}
      grid
      loading={loading}
      title={modalType === 'add' ? '新增菜单项' : '编辑菜单项'}
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
      <EditModalItem type={modalType} record={record} />
    </DrawerForm>
    }
  </>
}


export default MenuForm