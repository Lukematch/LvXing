import { defineConfig } from "@umijs/max";
import defaultSettings from './defaultSettings';
import routes from './routes'


export default defineConfig({
  hash: true,
  access: {},
  model: {},
  routes,
  initialState: {},
  layout: {
    locale: true,
    // siderWidth: 240,
    ...defaultSettings,
  },
  proxy: {
    '/api':{
      target:'http://localhost:3000/',  // 接口域名
      changeOrigin:true,
      secure:false,
      rewrite: (path: string) => path.replace('/api', '')
    }
  },
  fastRefresh: true,
  plugins: [
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
  ],
  keepalive: [/./],
  tabsLayout: {
    hasDropdown: true,
    // hasCustomTabs: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  antd: {
    configProvider: {},
    appConfig: {},
    theme: {
      token: {
        'colorPrimary': 'rgb(22, 200, 200)'
      }
    },
  },

  title: 'LvXing',
  // favicons: ['/favicon.ico']
})