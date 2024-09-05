import { ProColumns } from "@ant-design/pro-components";
import { PositionType } from "./index";
import {
  TruckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Tag, Tooltip, message } from "antd";
import { randomTagColor } from "@/utils";
import { format } from 'date-fns';

export const customColumns: ProColumns<PositionType>[] = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    fixed: 'left',
    // align: 'center',
    // ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '岗位名称',
    dataIndex: 'name',
    key: 'name',
    // copyable: true,
    // align: 'center',
    fixed: 'left',
    width: 150,
    ellipsis: true,
    renderText: (text: string) => {
      return <>
              <TruckOutlined style={{ marginRight: 5, color: '#aaa' }} />
              <Tooltip autoAdjustOverflow title={text}>{text}</Tooltip>
              <Tooltip title="复制">
                <CopyOutlined
                  onClick={() => {
                    navigator.clipboard.writeText(text).then(() => {
                      message.success('复制成功!');
                    });
                  }}
                  style={{ cursor: 'pointer', marginLeft: 5, color: '#aaa', fontSize: 10}}
                />
              </Tooltip>
            </>
    }
  },
  {
    title: '所属组织',
    dataIndex: 'affiliated_org',
    key: 'affiliated_org',
    align: 'center',
    width: 80,
    render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 80,
    hideInSearch: true,
    render: (text, record) => (
      <Tag color={record.status === '禁用' ? 'red' : 'green'}>
        {text}
      </Tag>
    ),
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 200,
    align: 'center',
    hideInSearch: true,
    renderText: (text: string) => (
      <Tooltip title={text}>
        {text?.length > 10 ? `${text.slice(0, 10)}...` : text}
      </Tooltip>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || '--',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center',
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || '--',
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    key: 'leader',
    hideInSearch: true,
  }
]