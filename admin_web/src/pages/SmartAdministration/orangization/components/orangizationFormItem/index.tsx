import { ProForm, ProFormDateRangePicker, ProFormDigit, ProFormRadio, ProFormSegmented, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components'
import { Select, TreeSelect, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrangizationList } from '../../server'
import { OrangizationType } from '../..'
import { UploadOutlined } from '@ant-design/icons'

const typeOptions = {
  '集团': '集团',
  '公司': '公司',
  '单位': '单位',
  '部门': '部门'
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
    {/* 组织简称 */}
    <ProFormText
    label='组织代号'
    name='id'
    placeholder='请输入组织代号'
    fieldProps={{
      showCount: true,
      maxLength: 10,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('组织代号不能为空！'))
          } else if (value.substring(0,2) !== 'lv') {
            return Promise.reject(new Error('组织代号应以“lv”作为开头！'))
          }
          return Promise.resolve()
        },
      },
    ]}
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
    name="class"
    label='组织类型'
    // initialValue={}
    valueEnum={typeOptions}
    rules={[{ required: true }]}
    />
    {/* 负责人 */}
    <ProFormText
    label='负责人'
    name='leader'
    placeholder='请输入负责人'
    // rules={[{ required: true }]}
    />
    {/* logo */}
    <ProFormUploadButton
    name="file"
    label='logo图标上传'
    colProps={{ span: 24 }}
    max={1}
    rules= {[ {required: true, message: '请上传logo！'} ]}
    // extra= '请上传图片'
    tooltip= 'logo类型：jpg、jpeg、png、gif'
    fieldProps={{
      name: 'file',
      listType: 'picture-card',
      // 配置图片上传 本地路径
      action: '/api/upload/image',

      multiple: false,
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
    extra="*支持单个图片文件上传且大小不超过10M*"
    />
    {/* 状态 */}
    <ProFormRadio.Group
    name="status"
    layout="horizontal"
    label="状态"
    options={[
      {
        label: '正常',
        value: '正常',
      },
      {
        label: '禁用',
        value: '禁用',
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
    fieldProps={{
      autoSize: { minRows: 3, maxRows: 10 },  // 根据需要调整 minRows 和 maxRows
    }}
    />
  </>
}

export default OrangizationFormItem