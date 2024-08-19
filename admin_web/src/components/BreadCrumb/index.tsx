// import { useLocation } from 'umi'
import { Breadcrumb, Table } from 'antd'
// import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import routes from '../../../config/routes'

const getBreadcrumbName = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  let currentRoutes = routes; // 当前路径对应的 routes
  let breadcrumbName = '';

  pathSegments.forEach((segment, index) => {
    const match: any = currentRoutes.find(route => route.path.split('/').filter(Boolean)[index] === segment);
    if (match) {
      breadcrumbName = match.name; // 每次匹配成功，更新 breadcrumbName
      if (match.routes) {
        currentRoutes = match.routes; // 继续匹配子路由
      }
    }
  });

  return breadcrumbName;
};

const BreadCrumb = ({location}: any) => {
  const pathSegments = location?.pathname?.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments?.map((segment: any, index: any) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      path,
      breadcrumbName: getBreadcrumbName(path),
    };
  });

  return (
    <div>
      <Breadcrumb>
      {breadcrumbItems?.map(({ breadcrumbName }: any, index: any) => (
        <Breadcrumb.Item key={index}>
          {breadcrumbName}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
    </div>
  )
}

export default BreadCrumb