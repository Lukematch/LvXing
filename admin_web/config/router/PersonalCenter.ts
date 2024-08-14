export default {
  path: '/personalCenter',
  name: '个人中心',
  icon: 'robot',
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
          icon: 'user',
          component: './PersonalCenter/personalInformation',
          // access: 'adminRouteFilter',
          exact: true,
      },
      {
          path: '/personalCenter/personalSettings',
          name: '个人设置',
          icon: 'userSwitch',
          component: './PersonalCenter/personalSettings',
          // access: 'adminRouteFilter',
          exact: true,
      },
  ],
}