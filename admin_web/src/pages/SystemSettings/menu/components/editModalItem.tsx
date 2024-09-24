import { ProFormDatePicker, ProFormSelect, ProFormText, ProFormTimePicker, ProFormUploadButton, ProFormDigit, ProFormTreeSelect } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { getRoleList } from '../../user/server';
import { iconMap } from '@/services/icon';
import { getMenuList } from '../server';
import { menuType } from '..';

// 生成 icon options 列表
const iconOptions = Object.keys(iconMap).map(key => ({
  label: (
    <span>
      {iconMap[key]} {key} {/* 显示图标和对应的key */}
    </span>
  ),
  value: key,
}));
const user = JSON.parse(localStorage.getItem('user')!)

const EditModalItem = (
  props: {
    type?: 'edit' | 'view' | 'add' | undefined,
    record?: any
  }
  ) => {

  const convertToTreeData = (nodes: menuType[]): any[] =>
  nodes?.map(node => ({
    title: node.menuName,
    value: node.id,
    key: node.id,
    children: node.children ? convertToTreeData(node.children) : []
  }));

  return <>
    {/* 父节点 */}
    <ProFormTreeSelect
    name='parentId'
    label='父节点'
    tooltip='不选默认为父节点'
    request={async () => {
      const res = await getMenuList(user)
      return convertToTreeData(res.data);
    }}
    />
    {/* 菜单名称 */}
    <ProFormText
    name='menuName'
    label='菜单名称'
    placeholder='请输入菜单名称'
    fieldProps={{
      showCount: true,
      maxLength: 24,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('menuName不能为空！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 菜单路径 */}
    <ProFormText
    name='path'
    label='菜单路由'
    placeholder='请输入菜单路由'
    tooltip='path'
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('path不能为空！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 菜单图标 */}
    <ProFormSelect
    name='icon'
    label='菜单图标'
    tooltip='icon'
    options={iconOptions}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('图标不能为空！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 组件 */}
    <ProFormText
    name="component"
    label='组件路径'
    // rules= {[ {required: true, message: '组件路径不为空！'} ]}
    tooltip= '按照src目录下的pages为启始目录'
    />
    {/* 邮箱 */}
    <ProFormSelect
    name='menuType'
    label='菜单权限'
    placeholder='请选择菜单权限'
    rules= {[ {required: true, message: '菜单权限不为空！'} ]}
    request={async () => {
      const { data } = await getRoleList();
      return data.map((item: any) => ({
        label: item.code === 'guest'? '游客菜单' : item.code === 'root' ? '管理员菜单' : '用户菜单',
        value: item.code,
      }))
    }}
    />
    {/* 排序 */}
    <ProFormDigit
    name='orderNum'
    label='排序'
    />
    {/* 创建人 */}
    <ProFormText
    name='createBy'
    label='创建人'
    disabled
    initialValue={user.nickName}
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

export default EditModalItem;
