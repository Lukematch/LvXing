// import { Link, useLocation } from '@umijs/max'
import { Avatar, Card, Col, Empty, Image, Row, Table } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import routes from '../../../../config/routes'
import React from 'react'
import  BreadCrumb from '@/components/BreadCrumb'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './index.module.less'
import { useLocation } from 'umi'
import { history, useModel } from '@umijs/max';
import ClockCard from '@/components/ClockCard'
import CustomCharts from './components/customCharts'

export default () =>{
  const location = useLocation();
  const { initialState, setInitialState } = useModel('@@initialState');

  return <div className={styles.workbench}>
      <div className={styles.breadCrumb}>
        <BreadCrumb location={location}/>
      </div>
      <Card className={styles.topCard}>
        <Row>
          <Col xl={6} lg={10} md={10} xs={24}>
            <Row style={{position: 'relative'}}>
            <Col style={{textAlign: 'center'}} xl={24} lg={24} md={24} xs={8}>
            <Avatar
            style={{marginBottom: 10}}
            shape="square" size={150}
            src={initialState?.avatar}
            />
            </Col>
            <Col xl={24} lg={24} md={24} xs={16} style={{ fontSize: 20, fontWeight: 100,alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
              欢迎
              {initialState?.name === 'admin'? '管理员' : '用户'}&nbsp;
              <span style={{fontWeight: 400}}>{initialState?.name}</span>
              &nbsp;访问
            </Col>
            </Row>
          </Col>
          <Col xl={10} lg={14} md={14} xs={24}>
            <ClockCard />
          </Col>
          <Col xl={8} lg={24} md={24} xs={24}>
            {/* 今日头条/天气 */}
            <Empty description='暂未开放' image={Empty.PRESENTED_IMAGE_SIMPLE} />;
          </Col>
        </Row>
      </Card>
    <Content className={styles.content}>
      <Row>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card className={styles.card}>
            <CustomCharts type='pie' width={'auto'} height={300} />
          </Card>
        </Col>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card className={styles.card}>
            <CustomCharts type='line' width={'auto'} height={300} />
          </Card>
        </Col>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card className={styles.card}>
            <CustomCharts type='bar' width={'auto'} height={300} />
          </Card>
        </Col>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card className={styles.card}>
            <CustomCharts type='scatter' width={'auto'} height={300} />
          </Card>
        </Col>
      </Row>
      {/* <Row>
        <Col lg={8} md={12} xs={24}>
          <Card className={styles.card} title='树图'></Card>
        </Col>
        <Col lg={8} md={12} xs={24}>
          <Card className={styles.card} title='OHLC图'></Card>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Card className={styles.card} title='地图柱状图变形动画'></Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={24}>
          <Card className={styles.card} title='雷达图'></Card>
        </Col>
        <Col md={12} xs={24}>
          <Card className={styles.card} title='路径图'></Card>
        </Col>
      </Row>
      <Row>
        <Col md={16} xs={24}>
          <Card className={styles.card} title='矩形树图'></Card>
        </Col>
        <Col md={8} xs={24}>
          <Card className={styles.card} title='技术栈'></Card>
        </Col>
      </Row> */}
       <Empty description='其余暂未开放' image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    </Content>
  </div>
}
