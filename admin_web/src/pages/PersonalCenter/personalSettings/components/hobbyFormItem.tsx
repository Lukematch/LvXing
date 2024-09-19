import { ProFormGroup, ProFormRadio, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components'
import { useModel } from '@umijs/max';
import { Empty, Radio } from 'antd'
import React, { useState } from 'react'

const HobbyFormItem = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<'text' | 'upload'>('text')
  return <>
    <ProFormText
    name='username'
    label='用户名'
    disabled
    initialValue={initialState?.user?.username}
    rules={[
      { required: true, message: '' }
    ]}
    />
    {/* 兴趣爱好名称 */}
    <ProFormText
     name='hobbyName'
     label='兴趣爱好名称'
     placeholder='请输入兴趣爱好名称'
     fieldProps={{
       showCount: true,
       maxLength: 24,
     }}
     rules={[
       { required: true, message: '' },
       {
         validator: (_, value) => {
           if (!value) {
             return Promise.reject(new Error('名称不能为空！'))
           } else if (value.length < 2) {
             return Promise.reject(new Error('名称不得少于两位字符！'))
           }
           return Promise.resolve()
         },
       },
     ]}
     />
    {/* 兴趣爱好描述 */}
    <ProFormTextArea
     name='hobbyDescription'
     label='兴趣爱好描述'
     placeholder='请输入兴趣爱好描述'
     fieldProps={{
       showCount: true,
       maxLength: 100,
     }}
     rules={[
       { required: true, message: '' },
       {
         validator: (_, value) => {
           if (!value) {
             return Promise.reject(new Error('描述不能为空！'))
           }
           return Promise.resolve()
         },
       },
     ]}
     />
     {/* 兴趣爱好图标 */}
    <ProFormRadio.Group
      name='type'
      label="兴趣爱好图标"
      radioType="button"
      options={[
        {
          label: 'Emoji',
          value: 'text',
        },
        {
          label: 'Image',
          value: 'upload',
        },
      ]}
      fieldProps={{
        value: type,
        onChange: (e) => setType(e.target.value),
      }}
    />
    {type === 'text'? <ProFormText
      name='hobbyIcon'
      extra='*请输入一个emoji表情*'
      rules={[
        { required: true, message: '图标不能为空！' }
      ]}
      /> : <Empty description='维修中，loading...'/>
      // <ProFormUploadButton
      // name="file"
      // colProps={{ span: 24 }}
      // max={1}
      // rules= {[ {required: true, message: '请上传图片！'} ]}
      // fieldProps={{
      //   name: 'file',
      //   listType: 'picture-card',
      //   // 配置图片上传 本地路径
      //   action: '/api/upload/image',
      //   multiple: false,
      //   maxCount: 1,
      //   accept: 'picture/*',
      //   progress: {
      //     strokeColor: {
      //       '0%': '#108ee9',
      //       '100%': '#87d068',
      //     },
      //     strokeWidth: 5,
      //     format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
      //   },
      // }}
      // extra="*支持单个图片文件上传且大小不超过10M*"
      // rules={[
      //   { required: true, message: '' }
      // ]}
      // />
    }
  </>
}

export default HobbyFormItem
