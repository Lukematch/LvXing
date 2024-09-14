import { ProFormDatePicker, ProFormSelect, ProFormText, ProFormTimePicker, ProFormUploadButton } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { getRoleList } from '../server';

const DrawerFormItem = (
  props: {
    type: 'edit' | 'view' | 'add' | undefined,
    record: any
  }
  ) => {
  return <>
    {/* 用户名 */}
    <ProFormText
    name='username'
    label='用户名'
    placeholder='请输入用户名账号'
    fieldProps={{
      showCount: true,
      maxLength: 24,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('用户名不能为空！'))
          } else if (value.length < 2) {
            return Promise.reject(new Error('用户名不得少于两位字符！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 名称 */}
    <ProFormText
    name='nickName'
    label='用户名称'
    placeholder='请输入用户名称'
    fieldProps={{
      showCount: true,
      maxLength: 12,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('用户名称不能为空！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 角色 */}
    <ProFormSelect
    name='role'
    label='角色'
    request={async () => {
      const { data } = await getRoleList()
      return data.map((role: any) => ({
        label: role?.name,
        value: role?.code
      }))
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('角色不能为空！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 头像 */}
    <ProFormUploadButton
    name="file"
    label='头像图标上传'
    colProps={{ span: 24 }}
    max={1}
    rules= {[ {required: true, message: '请上传头像！'} ]}
    // extra= '请上传图片'
    tooltip= '头像类型：jpg、jpeg、png、gif'
    fieldProps={{
      name: 'file',
      listType: 'picture-card',
      // 配置图片上传 本地路径
      action: '/api/upload/image',
      multiple: false,
      maxCount: 1,
      accept: 'picture/*',
      progress: {
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 5,
        format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
      },
    }}
    extra="*支持单个图片文件上传且大小不超过10M*"
    />
    {/* 邮箱 */}
    <ProFormText
    name='email'
    label='邮箱'
    />
    {/* 创建时间 */}
    <ProFormDatePicker
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
  </>
}

export default DrawerFormItem;
