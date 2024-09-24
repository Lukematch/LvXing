import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history } from '@umijs/max';


const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  // onMenuHeaderClick?: () => void; // 自定义添加这个属性
} = {
  // layout: 'side',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  colorWeak: true,
  title: 'LvXing',
  // pwa: false,
  logo: '/favicon.ico',
  iconfontUrl: '/favicon.ico',
  // onMenuHeaderClick: () => {
  //   history.push("/instructionPanel/workbench");
  // },
};

export default Settings;