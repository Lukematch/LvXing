// import { Link, useLocation } from '@umijs/max'
import { Avatar, Card, Col, Image, Row, Table } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import routes from '../../../../config/routes'
import React from 'react'
import  BreadCrumb from '@/components/BreadCrumb'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './index.module.less'
import { useLocation } from 'umi'
import { history, useModel } from '@umijs/max';
import ClockCard from '@/components/ClockCard'

export default () =>{
  const location = useLocation();
  const { initialState, setInitialState } = useModel('@@initialState');

  return <div className={styles.workbench}>
      <div className={styles.breadCrumb}>
        <BreadCrumb location={location}/>
      </div>
      <Card className={styles.topCard}>
        <Row>
          <Col xl={5} lg={10} md={10} xs={24}>
            <Row>
            <Col xl={24} lg={24} md={24} xs={12}>
            <Avatar
            style={{marginBottom: 10}}
            shape="square" size={150}
            src={initialState?.avatar}
            />
            </Col>
            <Col xl={24} lg={24} md={24} xs={12} style={{ fontSize: 20, fontWeight: 100,alignItems: 'center', display: 'flex'}}>
              欢迎用户&nbsp;
              <span style={{fontWeight: 400}}>{initialState?.name}</span>
              &nbsp;访问
            </Col>
            </Row>
          </Col>
          <Col xl={10} lg={14} md={14} xs={24}>
            <ClockCard />
          </Col>
          <Col xl={8} lg={24} md={24} xs={24}>
            今日头条/天气
          </Col>
        </Row>
      </Card>
    <Content className={styles.content}>
      <Row>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card title='饼图'></Card>
        </Col>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card title='折线图'></Card>
        </Col>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card title='柱状图'></Card>
        </Col>
        <Col xl={6} lg={12} md={12} xs={24}>
          <Card title='散点图'></Card>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={12} xs={24}>
          <Card title='树图'></Card>
        </Col>
        <Col lg={8} md={12} xs={24}>
          <Card title='OHLC图'></Card>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Card title='地图柱状图变形动画'></Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={24}>
          <Card title='雷达图'></Card>
        </Col>
        <Col md={12} xs={24}>
          <Card title='路径图'></Card>
        </Col>
      </Row>
      <Row>
        <Col md={16} xs={24}>
          <Card title='矩形树图'></Card>
        </Col>
        <Col md={8} xs={24}>
          <Card title='技术栈'></Card>
        </Col>
      </Row>
    </Content>
  </div>
}
