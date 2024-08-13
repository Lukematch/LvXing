export default {
  path: '/personalCenter',
  name: '个人中心',
  // access: 'adminRouteFilter',
  exact: true,
  routes: [
      {
          path: '/personalCenter',
          redirect: '/PersonalCenter/personalInformation',
          exact: true,
      },
      {
          path: '/personalCenter/personalInformation',
          name: '个人信息',
          component: './PersonalCenter/personalInformation',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
          path: '/personalCenter/personalSettings',
          name: '个人设置',
          component: './PersonalCenter/personalSettings',
          // access: 'adminRouteFilter',
          exact: true,
      },
  ],
}