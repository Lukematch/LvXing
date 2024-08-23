import { ProColumns } from '@ant-design/pro-components';
import type { DataSourceType } from './index'

// 重大事项：节假日、公司内部事项、会议记录，财务报告：某类型岗位薪资变更
// 风险提示：系统遭到xxx攻击，信息变更：部门、员工的调整
const topicOptions = [
  { label: <span>重大事项</span>, title: '重大事项',
    options: [
      { label: '节假日', value: '节假日' },
      { label: '公司内部事项', value: '公司内部事项' },
      { label: '会议记录', value: '会议记录' },
      { label: '财务报告', value: '财务报告' },
      { label: '岗位薪资变更', value: '岗位薪资变更' },
    ]
  },
  { label: <span>风险提示</span>, title: '风险提示',
    options: [
      { label: '系统遭到xxx攻击', value: '系统遭到xxx攻击' },
    ]
  },
  { label: <span>信息变更</span>, title: '信息变更',
    options: [
      { label: '部门调整', value: '部门调整' },
      { label: '员工调整', value: '员工调整'},
    ]
  }
]

export const setColumns: ProColumns<DataSourceType>[] = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    valueType: 'text',
    readonly: true,
    width: 50,
    fixed: 'left',
    align: 'center',
  },
  {
    title: '代号',
    dataIndex: 'id',
    key: 'id',
    valueType: 'text',
    width: 100,
    fixed: 'left',
    align: 'center',
    formItemProps: (form, { rowIndex }) => {
      return {
        rules: rowIndex ? [{ required: true, message: '此项为必填项' }] : [],
      };
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    valueType: 'text',
    width: 180,
    align: 'center',
    formItemProps: (form, { rowIndex }) => {
      return {
        rules: rowIndex ? [{ required: true, message: '此项为必填项' }] : [],
      };
    },
  },
  {
    title: '话题',
    dataIndex: 'topic',
    key: 'topic',
    valueType: 'select',
    width: 150,
    align: 'center',
    formItemProps: (form, { rowIndex }) => {
      return {
        rules: rowIndex ? [{ required: true, message: '此项为必选项' }] : [],
      };
    },
    fieldProps: {
      options: topicOptions,
      showSearch:  true ,
      onSearch: (value: any) => console.log(value),
    },
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    valueType: 'text',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    valueType: 'text',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    valueType: 'text',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'text',
    align: 'center',
    width: 100,
    formItemProps: (form, { rowIndex }) => {
      return {
        rules: rowIndex ? [{ required: true, message: '此项为必选项' }] : [],
      };
    },
    valueEnum: {
      closed: {
        text: '待发送',
        status: 'Default',
      },
      open: {
        text: '已发送',
        status: 'Success',
      },
      error: {
        text: '发送失败',
        status: 'Error',
      }
    },
    // 已发送、待发送-草稿、发送失败
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    valueType: 'dateTime',
    readonly: true,
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    valueType: 'dateTime',
    readonly: true,
    align: 'center',
  },
]