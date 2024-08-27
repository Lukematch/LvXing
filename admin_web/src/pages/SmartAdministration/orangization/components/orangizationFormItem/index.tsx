import { ProForm, ProFormDateRangePicker, ProFormDigit, ProFormRadio, ProFormSegmented, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadDragger } from '@ant-design/pro-components'
import { Select, TreeSelect, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrangizationList } from '../../server'
import { OrangizationType } from '../..'

const typeOptions = {
  1: '集团',
  2: '公司',
  3: '单位',
  4: '部门'
}


const OrangizationFormItem = () => {
  // 将树形数据转换为 TreeSelect 组件可用的数据格式
  const convertToTreeData = (nodes: OrangizationType[]): any[] =>
  nodes?.map(node => ({
    title: node.name,
    value: node.id,
    key: node.id,
    children: node.children ? convertToTreeData(node.children) : []
  }));

  return <>
    {/* 父级 */}
    <ProFormTreeSelect
    label='父级'
    name='parent_id'
    placeholder='请选择父级'
    tooltip='不选默认为根节点'
    request={async () => {
      // 获取数据
      const res = await getOrangizationList();
      // 转换成 TreeSelect 需要的格式
      return convertToTreeData(res.data);
    }}
    // showSearch
    // allowClear
    // treeDefaultExpandAll
    />
    {/* 组织名称 */}
    <ProFormText
    name="name"
    colProps={{ span: 24 }}
    label='组织名称'
    placeholder='请输入组织名称'
    fieldProps={{
      showCount: true,
      maxLength: 32,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('组织名称不能为空！'))
          } else if (value.length < 2) {
            return Promise.reject(new Error('组织名称不得少于两位字符！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 组织编码 */}
    <ProFormText
    name="code"
    colProps={{ span: 24 }}
    label='组织编码'
    placeholder='请输入组织编码'
    fieldProps={{
      showCount: true,
      maxLength: 32,
    }}
    rules={[{ required: true }]}
    />
    {/* 组织类型 */}
    <ProFormSegmented
    colProps={{ span: 10 }}
    name="type"
    label='组织类型'
    // initialValue={}
    valueEnum={typeOptions}
    rules={[{ required: true }]}
    />
    {/* 负责人 */}
    <ProFormSelect
    label='负责人'
    name='leader'
    placeholder='请选择负责人'
    // rules={[{ required: true }]}
    />
    {/* logo */}
    <ProFormUploadDragger
    name="file"
    label='logo图标上传'
    colProps={{ span: 24 }}
    max={1}
    rules= {[ {required: true, message: '请上传附件！'} ]}
    // extra= '请上传图片'
    tooltip= 'logo类型：jpg、jpeg、png、gif'
    fieldProps={{
      listType: 'picture-card',
      action: 'https://7bu.top/api/v1/upload',
      headers: {
        Authorization: 'Bearer 1468|x2HFab0CZH0UgJjUVqVSQm5TQkiq0qXPJDWTfHkU',
        'Content-Type': 'multipart/form-data',
      },
      // data: {
      //   // 添加的自定义请求参数
      //   file: 'file',
      //   album_id: 1264
      // },
      onChange(info) {
        const { status } = info.file;
        if (status === 'uploading') {
          console.log(`${info.file.name} 正在上传中...`);
        }
        if (status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          console.log('上传响应:', info);
        } else if (status === 'error') {
          message.error(`${info.file.name} 上传失败`);
          console.log('上传错误:', info.file.error);
        }
      },
      multiple: true,
      maxCount: 1,
      accept: 'picture/*',
      progress: {
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 5,
        format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
      },
    }}
    // value={logo}
    />
    {/* 状态 */}
    <ProFormRadio.Group
    name="status"
    layout="horizontal"
    label="状态"
    options={[
      {
        label: '正常',
        value: 'custom',
      },
      {
        label: '禁用',
        value: 'disabled',
      },
    ]}
    />
    {/* 排序 */}
    <ProFormDigit
    label="排序"
    tooltip="数级越大，排序越靠前"
    name="sort"
    // width="sm"
    min={1}
    max={999}
    />
    {/* 描述 */}
    <ProFormTextArea
    name='description'
    label='描述'
    />
  </>
}

export default OrangizationFormItem