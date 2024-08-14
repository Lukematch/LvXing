export default {
  path: '/instructionPanel',
  name: '主页',
  icon: 'appstore',
  // access: 'adminRouteFilter',
  exact: true,
  routes: [
      {
          path: '/instructionPanel',
          redirect: '/instructionPanel/workbench',
          exact: true,
      },
      {
          path: '/instructionPanel/workbench',
          name: '工作台',
          component: './InstructionPanel/workbench',
          icon: 'home',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
          path: '/instructionPanel/environmentalDependency',
          name: '环境依赖',
          component: './InstructionPanel/environmentalDependency',
          icon: 'pauseCircle',
          // access: 'adminRouteFilter',
          exact: true,
      },
  ],
}