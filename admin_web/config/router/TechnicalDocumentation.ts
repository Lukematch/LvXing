export default {
  path: '/technicalDocumentation',
  name: '技术文档',
  // access: 'adminRouteFilter',
  exact: true,
  // component: './TechnicalDocumentation',
  routes: [
    {
      path: '/technicalDocumentation',
      redirect: '/technicalDocumentation/technicalDocumentation'
    },
    {
      path: '/technicalDocumentation/test',
      name: '测试',
      icon: 'stop',
      component: './TechnicalDocumentation/test',
      exact: true,
    }
  ]
}