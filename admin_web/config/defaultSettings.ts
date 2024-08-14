import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  layout: 'mix',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  colorWeak: true,
  title: 'LvXing',
  // pwa: false,
  logo: '/favicon.ico',
  iconfontUrl: '/favicon.ico',
};

export default Settings;