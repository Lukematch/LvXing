import { ActionType, EditableFormInstance, EditableProTable, ProCard, ProColumns, ProFormField, ProFormInstance } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react'
import { mockData, setColumns } from './columns';
import { Button, Form, Popconfirm } from 'antd';
import { useModel } from '@umijs/max';

// import { reduce, toNumber } from 'lodash-es';

// 加载时间等待
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export type DataSourceType = {
  id: React.Key;
  index?: number;
  title?: string;
  topic?: string;
  content?: string;
  desc?: string;
  remark?: string;
  state?: string;
  created_time?: number;
  update_time?: number;
}

// const columnScrollX = (columns: ProColumns[]): number =>
//   reduce(columns, (sum: number, record: ProColumns) => sum + (Number(record.width) || 100), 0);


export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<EditableFormInstance>();
  const actionRef = useRef<ActionType>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [defaultData, setDefaultData] = useState<readonly DataSourceType[]>(mockData);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    // setInitialState({collapsed: true });
  },[])

  const columns = setColumns.concat( {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <Popconfirm
      title='是否确认删除'
      onConfirm={() => {
        setDefaultData(defaultData.filter((item) => item.id !== record.id));
      }}
      >
        <a key="delete">删除</a>
      </Popconfirm>
      ,
      <a key="edit" onClick={() => {
          if(record.id) actionRef.current?.startEditable(record.id);
        }}
      >编辑</a>,
    ]
  },)

  return <>
    <EditableProTable
      rowKey="id"
      headerTitle={<h3>公告管理</h3>}
      // maxLength={5}
      columns={columns}
      scroll={{  x: 'max-content'
        // columnScrollX(columns)
      }}
      controlled={true}
      editableFormRef={formRef}
      actionRef={actionRef}
      // request={}
      loading={isLoading}
      toolBarRender={() => [
        <Button onClick={() => {
          setIsLoading(true);
          waitTime(1000).then(() => {
            setIsLoading(false);
          });
        }}>
          刷新数据
        </Button>
      ]}
      value={defaultData}
      onChange={setDefaultData}
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: '新增一行',
        record: () => ({
          id: Math.floor(Math.random() * 10000) + 62400000,
          index: defaultData?.length +1
        }),
      }}

      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          await waitTime(2000);
          setDefaultData((prevData) =>
          prevData.map((item) => (item.index === rowKey ? { ...item, ...data } : item))
        );
        },
        onChange: (keys) => setEditableRowKeys(keys),
      }}

    />
    {/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
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
    </ProCard> */}
  </>
}
