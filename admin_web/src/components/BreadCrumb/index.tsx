// import { useLocation } from 'umi'
import { Breadcrumb, Table } from 'antd'
// import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
// import routes from '../../../config/routes'

const getBreadcrumbName = (pathname: string) => {
  // const match = routes.find(route => pathname.startsWith(route.path));
  const segments = pathname?.split('/').filter(Boolean)!;
  // console.log(segments,segments[segments.length - 1]);
  return segments.length > 0 ? segments[segments.length - 1] : '';
};

const BreadCrumb = ({location}: any) => {
  const pathSegments = location?.pathname?.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments?.map((segment: any, index: any) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    // console.log('@path:' + path);
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