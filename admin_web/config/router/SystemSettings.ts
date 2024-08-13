export default {
  path: '/systemSettings',
  name: '系统设置',
  // access: 'adminRouteFilter',
  exact: true,
  routes: [
      {
          path: '/systemSettings',
          redirect: '/SystemSettings/user',
          exact: true,
      },
      {
          path: '/systemSettings/user',
          name: '用户管理',
          component: './SystemSettings/user',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
          path: '/systemSettings/menu',
          name: '菜单管理',
          component: './SystemSettings/menu',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
        path: '/systemSettings/role',
        name: '角色管理',
        component: './SystemSettings/role',
        // access: 'adminRouteFilter',
        exact: true,
    },
    {
      path: '/systemSettings/operationLog',
      name: '操作日志',
      component: './SystemSettings/operationLog',
      // access: 'adminRouteFilter',
      exact: true,
    },
  ],
}