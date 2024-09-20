import BreadCrumb from '@/components/BreadCrumb'
import styles from './index.module.less'
import { ActionType, DrawerForm, ProCard, ProFormField, ProTable, ProColumns } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { getMenuList } from './server';
import { useLocation } from '@umijs/max';
import { Button, Dropdown, Form, MenuProps, Popconfirm, message } from 'antd';
import { customColumns } from './cloumns';
import { waitTime } from '@/utils';
import {
  PlusOutlined,
  MenuOutlined,
  DownOutlined
} from '@ant-design/icons';
import { getRoleList } from '../user/server';
import MenuForm from './components/menuform';

export type menuType = {
  id: number;
  menuName?: string;
  path?: string;
  icon?: string;
  component?: string;
  parentId?: number;
  orderNum?: number;
  menuType?: string;
  createBy?: string;
  createTime?: Date;
  updateTime?: Date;
  children?: menuType[];
};

export default () => {
  const [roleOptions, setRoleOptions] = useState([]);

  const location = useLocation();
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const user = JSON.parse(localStorage.getItem('user')!)

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [record, setRecord] = useState<any>()


  const [isLoading, setIsLoading] = useState<boolean>(false)
  // ProFormField获取数据展示
  const [dataSource, setDataSource] = useState<menuType[]>([])
  const fetchData = async () => {
    const data: any = await getMenuList(user);
    setDataSource(data)
  };
  useEffect(() => {
    // 获取岗位列表
    fetchData()
  }, [isLoading])
  // 正常可以不使用 此数据与ProTable无关

  useEffect(() => {
    const fetchRoleList = async () => {
      const { data } = await getRoleList();
      setRoleOptions(data.map((item: any) => ({
        label: item.code === 'guest'? '游客菜单' : item.code === 'root' ? '管理员菜单' : '用户菜单',
        value: item.code,
      })));
    };
    fetchRoleList();
  }, []);

  const columns: ProColumns<menuType>[] = customColumns(roleOptions).concat({
    title: '操作',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: (text: any, record: any, action: any) => {
      const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Button style={{color: '#16c8c8'}} type='link' key="view" onClick={handleView.bind(this, record)}>查看详情</Button>
          ),
        },
        {
          key: '2',
          label: (
            <Button style={{color: 'orange'}} type='link' key="edit" onClick={handleEdit.bind(this, record, 'edit')}>编辑</Button>
          ),
        },
        {
          key: '3',
          label: (
            <Popconfirm key="delete" title={`确定删除${record?.menuName}？`} onConfirm={handleDelete.bind(this, record?.id)}>
              <Button type='link' danger >删除</Button>
            </Popconfirm>
          ),
          // disabled: true,
        }
      ];
      <Popconfirm key="delete" title="确定删除吗？" onConfirm={handleDelete.bind(this, record.id!)}>
        <Button type='link' danger >删除</Button>
      </Popconfirm>
      return [
        <Dropdown menu={{ items }} key='more'>
        <Button>
          操作
          <DownOutlined />
        </Button>
      </Dropdown>
      ]
  }
  })

  const handleView = (record: any) => {
    setOpen(true);
    setModalType('view');
    setRecord(record)
  }

    // 处理 新增-编辑-事件
    const handleEdit = (record: any, type: 'add' | 'edit') => {
      setOpen(true);
      setModalType(type);
      setRecord(record)
      // if (type === 'edit') {
      //   setSaveId(record?.id)
      //   form.setFieldsValue(record)
      // } else {
      //   form.resetFields();
      // }
    }

    // 删除操作
    const handleDelete = async (id: number) => {
      setIsLoading(true)
      await waitTime(1000);
      // const { data } = id && await deletePosition(id)
      // data.code = 200 && message.success('删除成功')
      // data.code !== 200 && message.error('删除失败')
      // actionRef.current?.reload()
    }

  return <>
    <div className={styles.breadCrumb}>
      <BreadCrumb location={location}/>
    </div>
    <ProTable
      defaultSize='small'
      loading={isLoading}
      rowKey='id'
      headerTitle='菜单管理'
      actionRef={actionRef}
      search={{
        labelWidth: 'auto',
      }}
      scroll={{
        x: 'max-content',
      }}
      pagination={{
        showSizeChanger: true,
        defaultCurrent: 1,
        size: 'default',
        showTotal: (total, range) => `显示条目 ${range[0]} - ${range[1]} 共 ${total} 条`
      }}
      className={styles.menu}
      columns={columns}
      request={async (params: any) => {
        const {menuName, menuType, createBy} = params
        return await getMenuList(user, {menuName, menuType, createBy})
      }}
      onLoad={async ()=>{
        await waitTime(1000).then(()=>{
          message.success('数据加载成功')
          setIsLoading(false)
        })
      }}
      onRequestError={()=>{
        setIsLoading(false)
        message.error('数据请求失败')
      }}
      toolBarRender={() => [
        <Button
        key="button"
        icon={<PlusOutlined />}
        onClick={handleEdit.bind(this, null, 'add')}
        type="primary"
        >
          新建
        </Button>
      ]}
    />
    <MenuForm open={open} modalType={modalType} setOpen={setOpen} record={record}/>

    <ProCard title="表格数据" headerBordered collapsible defaultCollapsed
    style={{marginBottom: 40}}
    >
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
