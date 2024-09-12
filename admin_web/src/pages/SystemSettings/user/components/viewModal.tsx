import { Button, Descriptions, DescriptionsProps, Image, Modal, Space } from 'antd'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import {
  HolderOutlined,
  BorderOutlined,
  CloseOutlined,
  SwitcherOutlined
} from '@ant-design/icons'
import { format } from 'date-fns'


const ViewModal = (
  props: {
    type: 'edit' | 'view' | 'add' | undefined,
    open: boolean,
    setOpen: any,
    record: any
  }
) => {
  const {type, open, setOpen, record} = props

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '编号',
      children: <span>{record?.id}</span>,
    },
    {
      key: '2',
      label: '用户名',
      children: <span>{record?.username}</span>,
    },
    {
      key: '3',
      label: '名称',
      children: <span>{record?.nickName || '-'}</span>,
    },
    {
      key: '4',
      label: '邮箱',
      children: <span>{record?.email || '-'}</span>,
    },
    {
      key: '5',
      label: '角色',
      children: <span>{(record?.role === 'root'? '超级管理员' : record?.role === 'user'? '普通用户' : '游客' ) || '-'}</span>,
      span: 3
    },
    {
      key: '6',
      label: '创建时间',
      children: <span>{record?.updateTime && format(new Date(record?.createTime), 'yyyy-MM-dd HH:mm:ss') || '--'}</span>,
    },
    {
      key: '7',
      label: '更新时间',
      children: <span>{record?.updateTime && format(new Date(record?.updateTime), 'yyyy-MM-dd HH:mm:ss') || '--'}</span>,
    }
  ];

  return <Modal
    width={600}
    style={{display: 'flex', textAlign: 'center'}}
    maskStyle={{
      // 模糊化
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)' // 兼容 Safari
    }}
    modalRender={modal => (
      <Draggable disabled={false}>
        <div>{modal}</div>
      </Draggable>
    )}
    open={open}
    title={
      <Space style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        <span style={{ flex: 1, textAlign: 'left' }}>
          {type === 'view'? '查看详情' : null}
        </span>
        <Button type='text'
        style={{cursor: 'move', textAlign: 'center', marginRight: 215}}
        icon={<HolderOutlined />}
        />
      </Space>
    }
    closeIcon={<CloseOutlined style={{ fontSize: 18, marginTop: 10 }} />}
    onCancel={() => setOpen(false)}
    // style={{ top: isFullscreen ? 0 : 50}}
    // width={isFullscreen ? '100%' : '60%'}
    // bodyStyle={{ height: isFullscreen ? '100vh' : 'auto'}}
    footer={null}>
      <Image width={150} src={record?.avatar}
        preview={{
          maskStyle: {
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)'
          }
        }}
      />
      <Descriptions
        bordered
        size="small"
        items={items}
        column={{xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1}}
      />

  </Modal>
}

export default ViewModal