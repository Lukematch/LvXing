import { defineConfig } from "@umijs/max";
import defaultSettings from './defaultSettings';
import routes from './routes'


export default defineConfig({
  plugins: [
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
  ],
  hash: true,
  access: {},
  model: {},
  routes,
  initialState: {},
  keepalive: [/./],
  tabsLayout: {
    // 是否使用自定义的 tabs 组件，需要搭配运行时配置 getCustomTabs 使用
    hasCustomTabs: false,
    // 是否开启右侧的 tabs 管理器，可以实现“关闭左侧”，“关闭右侧”，“关闭其他”和“刷新”等功能。
    hasDropdown: false,
  },
  layout: {
    // locale: 'zh-CN',
    // siderWidth: 240,
    ...defaultSettings,
    contentStyle: { padding: 0 },
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
  locale: {
    default: 'zh-CN',
    antd: true,
    // baseNavigator: true,
    // baseSeparator: '-', // 设置语言环境分隔符
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