import { defineConfig, history } from "@umijs/max";
import defaultSettings from './defaultSettings';
import routes from './routes'
// import { getRoutes } from "./router/getroutes";


export default defineConfig({
  plugins: [
    // require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
    require.resolve('@umijs/plugins/dist/unocss')
  ],
  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx']
  },
  // icons: { autoInstall: {} },
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
    // siderWidth: 240,
    ...defaultSettings,
    contentStyle: { padding: 0 },
  },
  proxy: {
    '/api':{
      target:'http://127.0.0.1:3000',
      changeOrigin:true,
      secure:false,
      // rewrite: (path: string) => path.replace('/api', '/api')
    }
  },
  fastRefresh: true,
  locale: {
    default: 'zh-CN',
    antd: true,
    // baseNavigator: true,
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