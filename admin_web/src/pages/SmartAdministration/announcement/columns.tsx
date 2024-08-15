import { ProColumns } from '@ant-design/pro-components';
import type { DataSourceType } from './index'


export const mockData: DataSourceType[] = [
  {
    id: 62400001,
    index: 1,
    title: '公告一',
    topic: '公告一',
    content: '这个公告真有趣',
    desc: '这个公告真有趣',
    remark: '这个公告真有趣',
    state: 'open',
    created_time: 1590486176000,
    update_time: 1590486176000,
  },
  {
    id: 62400002,
    index: 2,
    title: '公告二',
    topic: '公告二',
    content: '这个公告真有趣',
    desc: '这个公告真有趣',
    remark: '这个公告真有趣',
    state: 'closed',
    created_time: 1590481162000,
    update_time: 1590481162000,
  },
];


export const setColumns: ProColumns<DataSourceType>[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    valueType: 'text',
    hideInTable: true,
  },
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    valueType: 'text',
    formItemProps: (form, { rowIndex }) => {
      return {
        rules:
          rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
      };
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    valueType: 'text',
  },
  {
    title: '话题',
    dataIndex: 'topic',
    key: 'topic',
    valueType: 'select',
    // 重大事项：节假日、公司内部事项、会议记录，财务报告：某类型岗位薪资变更，风险提示：系统遭到xxx攻击，信息变更：部门、员工的调整
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    valueType: 'text',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    valueType: 'text',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    valueType: 'text',
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    valueType: 'text',
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
    // 已发送、待发送-草稿
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    key: 'created_time',
    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    valueType: 'dateTime',
  },
]