import BreadCrumb from '@/components/BreadCrumb'
import styles from './index.module.less'
import { Button, List, Popconfirm, Tag, Tooltip, message } from 'antd'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { ClearOutlined } from '@ant-design/icons'
import { deleteAllOperationLog, deleteOperationLog, getOperationLogList } from './server'
import { useRef } from 'react'
import { format } from 'date-fns'

type operationLogType = {
  id?: number;
  message?: string;
  level?: string;
  timestamp?: Date;
}

export default () => {
  const actionRef = useRef<any>()
  const cloumns: ProColumns<operationLogType>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: '操作内容',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '操作类型',
      dataIndex: 'level',
      key: 'level',
      render: (text: any) => {
        return <Tag color={text === 'error' ? 'red' : 'blue'}>{text}</Tag>
      }
    },
    {
      title: '操作时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') || [],
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      align: 'center',
      fixed: 'right',
      render: (text: any, record: any, action: any) => {
        return [
          <Popconfirm key="delete" title="确定删除吗？" onConfirm={async ()=>{
            const { data } = await deleteOperationLog(record.id)
            data.success? message.success(data?.message):message.error(data?.message)
            // 刷新表格
            actionRef.current.reload()
          }}>
            <Button style={{color: '#16c8c8'}} type='link'>删除</Button>
          </Popconfirm>
        ]
      }
    }
  ]
  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
      headerTitle='操作日志'
      tooltip='🧹超过100条数据自动清理缓存'
      className={styles.operationLog}
      size='small'
      actionRef={actionRef}
      search={false}
      columns={cloumns}
      request={getOperationLogList}
      scroll={{
        x: 'max-content'
      }}
      pagination={{
        pageSize: 10
      }}
      toolBarRender={() => [
        <Tooltip title='清除缓存'>
          <ClearOutlined
          className={styles.clear}
          onClick={async () => {
            const { data } = await deleteAllOperationLog()
            data.success? message.success(data?.message):message.error(data?.message)
            actionRef?.current?.reload()
          }}/>
        </Tooltip>
      ]
      }
    />
  </>
}
