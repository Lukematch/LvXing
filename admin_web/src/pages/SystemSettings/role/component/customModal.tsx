import DraggableModal from "@/components/Modal/DraggableModal"
import { ProForm, ProFormDatePicker, ProFormText } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { useEffect } from "react";
import styles from './index.module.less'
import { updateRole } from "../server";
import { waitTime } from "@/utils";
import { message } from "antd";


const CustomModal = (
  props:{
    rowId?: number;
    open: boolean;
    setOpen: any;
    type: string;
    currentRecord: any;
    actionRef: any;
  }
) => {
  const { open, setOpen, type, currentRecord, rowId, actionRef} = props
  const [form] = ProForm.useForm()

  useEffect(() => {
    let editRecord = {
      name: currentRecord.name,
      code: currentRecord.code,
      createTime: dayjs(),
      updateTime: dayjs(),
    }
    type === 'edit' && form.setFieldsValue(editRecord)
  }, [open])

  const handleFinish = async (values: any) => {
    switch(type) {
      case 'add':
        // 新增
        const {data: addRes} = await updateRole(values)
        addRes?.success? message.success(addRes?.message) : message.error(addRes?.message)
        break;
        break;
      case 'edit':
        // 编辑
        const {data: editRes} = await updateRole(values, rowId)
        editRes?.success? message.success(editRes?.message) : message.error(editRes?.message)
        break;
    }
    await waitTime(1000)
    actionRef.current?.reload()
    setOpen(false)
  }

  return <>
    <DraggableModal
      open={open}
      setOpen={setOpen}
      title={type === 'edit'? '编辑角色' : '新增角色'}
    >
      <ProForm
        layout={'vertical'}
        form={form}
        className={styles.roleForm}
        onFinish={handleFinish}
      >
        <div className={styles.textContainer}>
        <ProFormText
          width={240}
          name="name"
          label="角色名称"
          placeholder="请输入角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}
        />
        <ProFormText
          width={240}
          name="code"
          label="角色编码"
          placeholder="请输入角色编码"
          rules={[{ required: true, message: '请输入角色名称' }]}
        />
        </div>
        {/* 创建时间 */}
        <ProFormDatePicker
        width={240}
        name='createTime'
        // disabled
        hidden={props.type === 'edit'}
        fieldProps={{
          // defaultValue: dayjs(),
          value: dayjs(),
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
        }}
        initialValue={dayjs()}
        label='创建时间'
        />
        {/* 更新时间 */}
        <ProFormDatePicker
        width={240}
        name='updateTime'
        // disabled
        fieldProps={{
          // defaultValue: dayjs(),
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
        }}
        initialValue={dayjs()}
        label='更新时间'
        />
      </ProForm>
    </DraggableModal>
  </>
}

export default CustomModal