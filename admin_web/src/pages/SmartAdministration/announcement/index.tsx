import { ActionType, EditableFormInstance, EditableProTable, ProCard, ProFormField, ProFormInstance } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react'
import { mockData, setColumns } from './columns';
import { Button, Form } from 'antd';

// 加载时间等待
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export type DataSourceType = {
  id?: number;
  index: number;
  title?: string;
  topic?: string;
  content?: string;
  desc?: string;
  remark?: string;
  state?: string;
  created_time?: number;
  update_time?: number;
}

export default () => {
  const formRef = useRef<EditableFormInstance>();
  const actionRef = useRef<ActionType>();

  const columns = setColumns.concat( {
    title: '操作',
    valueType: 'option',
    render: (_, row) => [
      <a key="delete" onClick={() => {
          const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
          formRef.current?.setFieldsValue({
            table: tableDataSource?.filter((item) => item.index !== row?.index),
          });
        }}
      >移除</a>,
      <a key="edit" onClick={() => {
          actionRef.current?.startEditable(row?.index);
        }}
      >编辑</a>,
    ]
  },)

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [defaultData, setDefaultData] = useState<readonly DataSourceType[]>(mockData);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  return <>
    <EditableProTable
      rowKey="index"
      headerTitle={<h3>公告管理</h3>}
      maxLength={5}
      columns={columns}
      scroll={{ x: 800 }}
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
          index: defaultData?.length + 1,
        }),
      }}

      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          await waitTime(2000);
        },
        onChange: setEditableRowKeys,
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
