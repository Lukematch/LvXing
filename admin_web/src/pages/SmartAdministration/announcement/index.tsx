import { ActionType, EditableFormInstance, EditableProTable, ProCard, ProColumns, ProFormField, ProFormInstance, RequestData } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react'
import { setColumns } from './columns';
import { Button, Card, Form, Popconfirm, message } from 'antd';
import { useModel, useLocation } from '@umijs/max';
import {
  addAnnouncement,
  deleteAnnouncement,
  getAnnouncementList,
  updateAnnouncement
} from './server';
import BreadCrumb from '@/components/BreadCrumb';
import styles from './index.module.less'

// 加载时间等待 封装
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export type DataSourceType = {
  Ids: React.Key;
  id: number;
  index?: number;
  title?: string;
  topic?: string;
  content?: string;
  desc?: string;
  remark?: string;
  status?: string;
  create_time?: number;
  update_time?: number;
}

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const location = useLocation();

  const formRef = useRef<EditableFormInstance>();
  const actionRef = useRef<ActionType>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  // ProFormField获取数据展示
  const [dataSource, setDataSource] = useState<DataSourceType[]>()
  const fetchData = async () => {
    const data: any = await getAnnouncementList();
    setDataSource(data)
  };
  useEffect(() => {
    fetchData()
  },[isLoading])
  // 正常可以不使用 此数据与EditTableProTable无关


  const columns = setColumns.concat( {
    title: '操作',
    valueType: 'option',
    align: 'center',
    render: (text, record, _, action) => [
      <Popconfirm
      title='是否确认删除'
      onConfirm={async () => {
        setIsLoading(true)
        await waitTime(2000);
        const res = await deleteAnnouncement({ id: record?.id });
        if(res?.data.code === 200) {
          message.success('删除成功')
          actionRef.current?.reload()
        } else message.error('删除失败 ' + res?.data?.message)
      }}
      >
        <a key="delete">删除</a>
      </Popconfirm>
      ,
      <a key="edit" onClick={() => {
          if(record?.Ids) actionRef.current?.startEditable(record.Ids);
        }}
      >编辑</a>,
    ]
  },)

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <EditableProTable
      className={styles.announcement}
      rowKey="Ids"
      headerTitle={<h3>公告管理</h3>}
      columns={columns}
      scroll={{
        x: 'max-content'
      }}
      controlled={true}
      editableFormRef={formRef}
      actionRef={actionRef}
      request={getAnnouncementList}
      loading={isLoading}
      onLoad={()=>{
        setIsLoading(false)
      }}
      // onRequestError={()=>{
      //   setIsLoading(false)
      //   message.error('数据请求失败')
      // }}
      toolBarRender={() => [
        <Button onClick={() => {
          setIsLoading(true);
          waitTime(1000).then(() => {
            actionRef.current?.reload()
            message.success('刷新成功')
          })
        }}>
          刷新数据
        </Button>
      ]}
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: '新增一行',
        record: () => ({
          Ids: Math.floor(Math.random() * 100000),
          create_time: new Date().getTime(),
          update_time: new Date().getTime(),
        }),
      }}

      editable={{
        // type: 'multiple',
        type: 'single',
        editableKeys,
        // 提交修改 保存
        onSave: async (rowKey, data, row) => {
          setIsLoading(true);
          await waitTime(2000);
          // 修改 存在项
          if (row?.id) {
            // 秒级时间戳
            const createTime = new Date(data.create_time).getTime() / 1000
            const updateTime = new Date().getTime() / 1000
            data.create_time = createTime
            data.update_time = updateTime
            delete data.id
            delete data.index
            console.log('edit', rowKey, data, row);
            const res = await updateAnnouncement({ id: row?.id, data })
            if(res.data.code === 200) {
              message.success('保存成功')
            } else message.error('保存失败 ' + res?.data?.message)
          // 新增
          } else {
            const createTime = new Date(data.create_time).getTime() / 1000
            const updateTime = new Date(data.create_time).getTime() / 1000
            data.create_time = createTime
            data.update_time = updateTime
            console.log('add', rowKey, data, row);
            const res = await addAnnouncement(data)
            if(res.data.code === 200) {
              message.success('保存成功')
            } else message.error('保存失败 ' + res?.data?.message)
          }
          actionRef.current?.reload()
        },
        onChange: (keys) => {
          setEditableRowKeys(keys)
        },
        onCancel: async (key) => actionRef.current?.cancelEditable(key)
      }}

    />
    <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
      <ProFormField
        ignoreFormItem
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        mode="read"
        valueType="jsonCode"
        text={JSON.stringify(dataSource)}
      />
    </ProCard>
  </>
}
