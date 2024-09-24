import { ProColumns } from "@ant-design/pro-components";
import { roleType } from ".";


export const customColumns = (): ProColumns<roleType>[] => [
  {
    title: "编号",
    dataIndex: "id",
    key: 'id',
  },
  {
    title: "角色名称",
    dataIndex: "name",
    key: 'name',
    valueType: "text",
  },
  {
    title: "角色编码",
    dataIndex: "code",
    key: 'code',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    valueType: 'dateTime',
  }
]