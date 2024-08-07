import { defineConfig } from "@umijs/max";
import routes from './routes'


export default defineConfig({
  hash: true,
  access: {},
  model: {},
  routes,
  initialState: {},
  layout: {},
  // proxy:
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  antd: {
    configProvider: {},
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // less or css, default less
    // style: 'less',
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {
      token: {
        'colorPrimary': 'rgb(22, 200, 200)'
      }
    },
    // Add StyleProvider for legacy browsers
    // styleProvider: {
    //   hashPriority: 'high',
    //   legacyTransformer: true,
    // },
  },
  title: 'Admin-react',
  favicons: ['/favicon.ico']
})