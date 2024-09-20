import { ProColumns } from "@ant-design/pro-components";
import { menuType } from ".";
import { Image, Tag, Tooltip, message } from "antd";
import {
  CopyOutlined,
  MenuOutlined
} from '@ant-design/icons'
import { format } from "date-fns";
import { iconMap } from "@/services/icon";
import { renderMenuIcon } from "@/utils";


export const customColumns = (roleOptions: any[]): ProColumns<menuType>[] => [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
    fixed: 'left',
    width: 120,
    renderText: (text: string) => {
      return <>
              <MenuOutlined style={{ marginRight: 5, color: '#aaa' }} />
              <Tooltip autoAdjustOverflow title={text}>{text}</Tooltip>
              <Tooltip title="复制">
                <CopyOutlined
                  onClick={() => {
                    navigator.clipboard.writeText(text).then(() => {
                      message.success('复制成功');
                    });
                  }}
                  style={{ cursor: 'pointer', marginLeft: 5, color: '#aaa', fontSize: 10}}
                />
              </Tooltip>
            </>
    }
  },
  {
    title: '菜单路径',
    dataIndex: 'path',
    key: 'path',
    width: 80,
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
    valueType:  'image',
    width: 80,
    hideInSearch: true,
    render: (_, record) => (
      <div className="position-relative w-auto h-auto">
        {renderMenuIcon(record.icon)}
      </div>
    )
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component',
    align: 'center',
    width: 80,
    hideInSearch: true,
    tooltip:'父组件路由默认为空',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    key: 'orderNum',
    align: 'center',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    key: 'menuType',
    align: 'center',
    valueType: 'select',
    fieldProps: {
      options: roleOptions
    },
    width: 80,
    render: (text, record) => (
      <Tag color={record.menuType === 'root' ? '#16c8c8' : record.menuType === 'user' ? 'orange' : 'green'}>
        {text}
      </Tag>
    ),
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    key: 'createBy',
    align: 'center',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: 150,
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || [],
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
    width: 150,
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || [],
  }

]