import { Image, Tag, Tooltip, message } from "antd";
import {
  CopyOutlined
} from '@ant-design/icons'
import { randomTagColor } from "@/utils";
import { ProColumns } from "@ant-design/pro-components";
import { UserType } from "./index";
import { format } from "date-fns";

// 元组配置
export const customColumns: ProColumns<UserType>[] = [
  {
    title: 'id',
    key: 'id',
    dataIndex:'id',
    hideInTable: true,
    hideInSearch: true
  },
  {
    title: '编号',
    key: 'index',
    dataIndex:'index',
    fixed: 'left',
    width: 80,
    hideInSearch: true
  },
  {
    title: '用户名',
    key: 'username',
    dataIndex: 'username',
    fixed: 'left',
    width: 120,
    ellipsis: true,
    renderText: (text: string) => {
      return <>
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
    title: '名称',
    key: 'nickName',
    dataIndex: 'nickName',
    render: (text: any) => <Tag color={randomTagColor()}>{text}</Tag>,
  },
  {
    title: '头像',
    key: 'avatar',
    dataIndex: 'avatar',
    valueType: 'image',
    width: 80,
    hideInSearch: true,
    render: (_, record) => (
      <Image
      width={60}
      src={record?.avatar}
      preview={{
        maskStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          transition: 'opacity 0.3s ease', /* 渐变过渡效果 */
          opacity: 1,
          // 模糊化
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)' // 兼容 Safari
        },
      }}
      />
    )
  },
  {
    title: '用户角色',
    key: 'role',
    dataIndex: 'role',
    valueType: 'select',
    align: 'center',
    width: 120,
    render: (text: any) => {
      let role = text.props.record.role
      let color = role === 'root'? '#16c8c8': role === 'user'? 'green' : 'orange'
      return <Tag color= {color}>{role === 'root'? '超级管理员' : role === 'user'? '普通用户' : '游客'}</Tag>
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || '--',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || '--',
  },
]