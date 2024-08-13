export default {
  path: '/smartAdministration',
  name: '智能管理',
  // access: 'adminRouteFilter',
  exact: true,
  routes: [
      {
          path: '/smartAdministration',
          redirect: '/smartAdministration/announcement',
          exact: true,
      },
      {
          path: '/smartAdministration/announcement',
          name: '公告管理',
          component: './SmartAdministration/announcement',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
          path: '/smartAdministration/organization',
          name: '组织管理',
          component: './SmartAdministration/organization',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
        path: '/smartAdministration/position',
        name: '岗位管理',
        component: './SmartAdministration/position',
        // access: 'adminRouteFilter',
        exact: true,
    },
    {
      path: '/smartAdministration/organizationalStructure',
      name: '组织架构',
      component: './SmartAdministration/organizationalStructure',
      // access: 'adminRouteFilter',
      exact: true,
    },
  ],
}