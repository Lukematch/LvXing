import { useLocation } from '@umijs/max'
import { Badge, Card, Col, Row, Space, Typography } from 'antd'
import pckJson1 from '../../../../package.json';
import pckJson2 from '../../../../../admin_server/package.json';
import BreadCrumb from '@/components/BreadCrumb';

const { Text } = Typography;

const EnvironmentalDependence = () => {
  const location = useLocation()
  // 渲染依赖布局
  const renderDependenciesLayout = (dataSource: Record<string, string> | any, title: string) => {
    console.log(dataSource);
    return (
      <Card title={title}>
        <Row gutter={[12, 10]}>
          {
            Object.keys(dataSource)?.map((key: string, index: number) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={key}>
                <Badge.Ribbon text={dataSource[key]} >
                  <Card>
                    <Text strong ellipsis={{ tooltip: key }} style={{ width: '100%' }}>{key}</Text>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))
          }
        </Row>
      </Card>
    )
  }
  return <div>
    <div style={{marginLeft: 20}}>
      <BreadCrumb location={location}/>
    </div>
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      {/* 生产环境依赖 */}
      {renderDependenciesLayout({...pckJson1.dependencies, ...pckJson2.dependencies}, '生产环境依赖')}
      {/* 开发环境依赖 */}
      {renderDependenciesLayout({...pckJson1.devDependencies, ...pckJson2.devDependencies}, '开发环境依赖')}
    </Space>
  </div>
}

export default EnvironmentalDependence