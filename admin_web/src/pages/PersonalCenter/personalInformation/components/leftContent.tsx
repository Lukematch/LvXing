import { useModel } from '@umijs/max';
import { Avatar, Button, Image, Space, Typography } from 'antd';
import React, { useState } from 'react'
// import {} from 'unocss'


const { Title, Paragraph } = Typography;

const LeftContent=() => {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');
  const [previewVisible, setPreviewVisible] = useState(false);

  return <>
    <Space direction="vertical" style={{ display: 'flex', textAlign: 'center'}}>
      <Avatar
        src={<Image src={initialState?.avatar}
            preview={{ visible: previewVisible, onVisibleChange: setPreviewVisible, maskStyle:{
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)' // 兼容 Safari
            }}}/>}
        size={120}
      />
      <Title level={3} style={{ marginBottom: 0 }}>
        {initialState?.name}
      </Title>
      {initialState?.user?.desc ? <Paragraph
      className="text-4s"
      copyable>
        {initialState?.user?.desc}
      </Paragraph> : null}
    </Space>
    <Space direction="vertical" style={{ display: 'flex', textAlign: 'center'}}>
        {initialState?.user?.email &&<Paragraph className="text-gray-500">📧 邮箱：{initialState?.user?.email}</Paragraph>}
        {initialState?.user?.phone &&<Paragraph className="text-gray-500 mt--5">📱 手机：{initialState?.user?.phone}</Paragraph>}
    </Space>
  </>
}

export default LeftContent;