import { ProColumns } from "@ant-design/pro-components";
import { Tag, Tooltip, message } from "antd";
import { OrangizationType } from ".";
import { randomTagColor } from "@/utils";
import { mapValues } from "lodash";
import { TeamOutlined, CopyOutlined } from "@ant-design/icons";

export const customColumns: ProColumns<OrangizationType>[] = [
  {
    title: '组织名称',
    dataIndex: 'name',
    key: 'name',
    // copyable: true,
    // align: 'center',
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
    valueType: {
      type: 'image',
      width: 60,
    },
    width: 80,
    hideInSearch: true,
  },
  {
    title: '组织类型',
    dataIndex: 'type',
    key: 'type',
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
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    key: 'leader',
    hideInSearch: true,
  }
]