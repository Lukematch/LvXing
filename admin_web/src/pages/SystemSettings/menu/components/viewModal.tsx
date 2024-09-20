import { Button, Descriptions, DescriptionsProps, Image, Modal, Space, Tag } from 'antd'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import {
  HolderOutlined,
  BorderOutlined,
  CloseOutlined,
  SwitcherOutlined
} from '@ant-design/icons'
import { format } from 'date-fns'
import DraggableModal from '@/components/Modal/DraggableModal'
import { renderMenuIcon } from '@/utils'


const ViewModal = (
  props: {
    type: 'edit' | 'view' | 'add' | undefined,
    open: boolean,
    setOpen: any,
    record: any
  }
) => {
  const {type, open, setOpen, record} = props

  console.log(record);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '编号',
      children: <span>{record?.id}</span>,
    },
    {
      key: '2',
      label: '父节点编号',
      children: <span>{record?.parentId || '-'}</span>,
    },
    {
      key: '3',
      label: '菜单名称',
      children: <span>{record?.menuName || '-'}</span>,
    },
    {
      key: '4',
      label: '菜单图标',
      children: <span style={{color: '#aaa'}}>{renderMenuIcon(record?.icon)  || '-'}</span>,
    },
    {
      key: '5',
      label: '菜单路径',
      children: <span>{record?.path || '-'}</span>,
      span: 3
    },
    {
      key: '6',
      label: '组件',
      children: <span>{record?.component || '-'}</span>,
      span: 3
    },
    {
      key: '7',
      label: '菜单类型',
      children: <Tag color={record.menuType === 'root' ? '#16c8c8' : record.menuType === 'user' ? 'orange' : 'green'}>
        {record.menuType === 'guest'? '游客菜单' : record.menuType === 'root' ? '管理员菜单' : '用户菜单'}
      </Tag>,
      span: 3
    },
    {
      key: '8',
      label: '排序',
      children: <span>{record?.orderNum || '-'}</span>,
    },
    {
      key: '9',
      label: '创建人',
      children: <span>{record?.createBy || '--'}</span>,
    },
    {
      key: '10',
      label: '创建时间',
      children: <span>{record?.createTime && format(new Date(record?.createTime), 'yyyy-MM-dd HH:mm:ss') || '--'}</span>,
    },
    {
      key: '11',
      label: '更新时间',
      children: <span>{record?.updateTime && format(new Date(record?.updateTime), 'yyyy-MM-dd HH:mm:ss') || '--'}</span>,
    }
  ];

  return <DraggableModal
    open={open}
    setOpen={setOpen}
    title='查看详情'
    >
      <Descriptions
        bordered
        size="small"
        items={items}
        column={{xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1}}
      />
  </DraggableModal>
}

export default ViewModal