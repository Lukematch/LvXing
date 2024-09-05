import { ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton } from "@ant-design/pro-components";
import { PositionType } from "../..";
import { getPositionList } from "../../server";
import { getOrangizationList } from "@/pages/SmartAdministration/orangization/server";
import { OrangizationType } from "@/pages/SmartAdministration/orangization";



const PositionFormItem = () => {
  // 将树形数据转换为 TreeSelect 组件可用的数据格式

  const convertToTreeData = (nodes: PositionType[] | OrangizationType[]): any[] =>
  nodes?.map(node => ({
    title: node.name,
    value: node.id,
    key: node.id,
    children: node.children ? convertToTreeData(node.children) : []
  }));

  const convertToTreeData2 = (nodes: PositionType[] | OrangizationType[]): any[] =>
  nodes?.map(node => ({
    title: node.name,
    value: node.name,
    key: node.name,
    children: node.children ? convertToTreeData2(node.children) : []
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
      const res = await getPositionList();
      // 转换成 TreeSelect 需要的格式
      return convertToTreeData(res.data);
    }}
    // showSearch
    // allowClear
    // treeDefaultExpandAll
    />
    {/* 岗位名称 */}
    <ProFormText
    name="name"
    colProps={{ span: 24 }}
    label='岗位名称'
    placeholder='请输入岗位名称'
    fieldProps={{
      showCount: true,
      maxLength: 32,
    }}
    rules={[
      { required: true, message: '' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('岗位名称不能为空！'))
          } else if (value.length < 2) {
            return Promise.reject(new Error('岗位名称不得少于两位字符！'))
          }
          return Promise.resolve()
        },
      },
    ]}
    />
    {/* 所属组织 */}
    <ProFormTreeSelect
    name="affiliated_org"
    colProps={{ span: 24 }}
    label='所属组织'
    placeholder='请选择所属组织'
    rules={[{ required: true, message: '所属组织不能为空！'}]}
    request={async () => {
      // 获取数据
      const res = await getOrangizationList();
      // 转换成 TreeSelect 需要的格式
      return convertToTreeData2(res.data);
    }}
    />
    {/* 负责人 */}
    <ProFormText
    label='负责人'
    name='leader'
    placeholder='请输入负责人'
    // rules={[{ required: true }]}
    />
    {/* 状态 */}
    <ProFormRadio.Group
    name="status"
    layout="horizontal"
    label="状态"
    initialValue={'正常'}
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

export default PositionFormItem