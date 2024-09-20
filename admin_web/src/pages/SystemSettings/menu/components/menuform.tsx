import { DrawerForm } from '@ant-design/pro-components';
import ViewModal from './viewModal';
import { Form } from 'antd';
import EditModalItem from './editModalItem';

const MenuForm = (props:{
  open: boolean,
  setOpen: any,
  modalType: 'add' | 'edit' | 'view' | undefined,
  record: any
}) => {
  const { open, setOpen, modalType, record } = props;
  const [form] = Form.useForm()
  return <>
    {props?.modalType === 'view'?<ViewModal type={modalType} open={open} setOpen={setOpen} record={record}/> :
      <DrawerForm
      width={500}
      grid
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
      // onFinish={handleFinish}
    >
      <EditModalItem type={modalType} record={record} />
    </DrawerForm>
    }
  </>
}


export default MenuForm