import { instructionPanel, smartAdministration, personalCenter, technicalDocumentation, systemSettings } from './router'

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: '../pages/User/Login'
      }
    ]
  },
  instructionPanel,
  smartAdministration,
  personalCenter,
  technicalDocumentation,
  systemSettings,
  {
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '*',
    layout: false,
    component: '../pages/User/404'
  },
]

