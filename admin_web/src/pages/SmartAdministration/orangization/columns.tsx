import { ProColumns } from "@ant-design/pro-components";
import { Image, Tag, Tooltip, message } from "antd";
import { OrangizationType } from ".";
import { randomTagColor } from "@/utils";
import { mapValues } from "lodash";
import { TeamOutlined, CopyOutlined } from "@ant-design/icons";
import { format } from 'date-fns';

export const customColumns: ProColumns<OrangizationType>[] = [
  {
    title: '组织名称',
    dataIndex: 'name',
    key: 'name',
    // copyable: true,
    // align: 'center',
    fixed: 'left',
    width: 150,
    ellipsis: true,
    renderText: (text: string) => {
      return <>
              <TeamOutlined style={{ marginRight: 5, color: '#aaa' }} />
              <Tooltip autoAdjustOverflow title={text}>{text}</Tooltip>
              <Tooltip title="复制">
                <CopyOutlined
                  onClick={() => {
                    navigator.clipboard.writeText(text).then(() => {
                      message.success('复制成功!');
                    });
                  }}
                  style={{ cursor: 'pointer', marginLeft: 5, color: '#aaa', fontSize: 10}}
                />
              </Tooltip>
            </>
    }
  },
  {
    title: '组织编码',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    width: 80,
    render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
  },
  {
    title: '组织图标',
    dataIndex: 'logo',
    key: 'logo',
    align: 'center',
    valueType:  'image',
    width: 80,
    hideInSearch: true,
    render: (_, record) => (
      <Image
      width={60}
      src={record.logo}
      preview={{
        maskStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          transition: 'opacity 0.3s ease', /* 渐变过渡效果 */
          opacity: 1,
          // 模糊化
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)' // 兼容 Safari
        },
      }}
      />
    )
  },
  {
    title: '组织类型',
    dataIndex: 'class',
    key: 'class',
    align: 'center',
    width: 80,
    hideInSearch: true,
    // valueEnum: mapValues(OrgTypeEnum, (item: string) =>
    // formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, `org_type.${item}`) }),
    // ),
    render: (text) => (
      <Tag color={randomTagColor()}>
        <span>{text}</span>
      </Tag>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 80,
    hideInSearch: true,
    render: (text, record) => (
      <Tag color={record.status === '禁用' ? 'red' : 'green'}>
        {text}
      </Tag>
    ),
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 200,
    align: 'center',
    hideInSearch: true,
    renderText: (text: string) => (
      <Tooltip title={text}>
        {text?.length > 25 ? `${text.slice(0, 25)}...` : text}
      </Tooltip>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center',
    hideInSearch: true,
    render: (text: any) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    key: 'leader',
    hideInSearch: true,
  }
]