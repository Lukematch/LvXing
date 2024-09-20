/**
 * 可拖拽 Modal
 */
import { Button, Modal, Space } from 'antd'
import React, { ReactNode } from 'react'
import Draggable from 'react-draggable'
import {
  HolderOutlined,
  CloseOutlined
} from '@ant-design/icons'

const DraggableModal = (
  props:{
    open: boolean,
    setOpen: (open: boolean) => void,
    title: string,
    children: ReactNode
  }
) => {
  const {open, title, setOpen, children} = props
  return <>
    <Modal
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
          {title? title : 'Modal'}
        </span>
        <Button type='text'
        style={{cursor: 'move', textAlign: 'center', marginRight: 215}}
        icon={<HolderOutlined />}
        />
      </Space>
    }
    closeIcon={<CloseOutlined style={{ fontSize: 18, marginTop: 10 }} />}
    onCancel={() => setOpen(false)}
    footer={null}>
      {children}
    </Modal>
  </>
}

export default DraggableModal
