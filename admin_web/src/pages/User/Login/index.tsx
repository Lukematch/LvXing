import React, { FC, useContext } from 'react'

// less样式
import styles from './index.module.less';
import { Button, Card, Form, Image, Input, Row, Select } from 'antd';
import { KeyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

import { ConfigProvider } from 'antd';
//@ts-ignore
import { css } from '@emotion/css'
//@ts-ignore
import { history } from 'umi'


const LoginPage: FC = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;
      > span {
        position: relative;
      }
      &::before {
        content: '';
        background: linear-gradient(45deg,#16c8c8, #40a440);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }
      &:hover::before {
        opacity: 0;
      }
    }
  `;
  const LoginHome = () => {
    history.push("/home");
  }
  return (
    <ConfigProvider
    button={{
      className: linearGradientButton,
    }}
    >
    <div>
      <div className={styles.container}>
      <Card
      bordered
      className={styles.loginCard}>
        <h2>Admin-react</h2>
        <Form
        className={styles.loginForm}
        // initialValues={{ remember: false,
        //   username: 'admin',
        //   password: '123456'
        // }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        >
          <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名!' }
          ]}>
            <Input
            prefix={
              <UserOutlined className={styles.prefixIcon}/>
            }
            placeholder="请输入用户名"
            className={styles.loginInput}
            />
          </Form.Item >
          <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入用户名!' }
          ]}>
            <Input.Password
            prefix={
              <LockOutlined className={styles.prefixIcon}/>
            }
            placeholder="请输入密码"
            className={styles.loginInput}
            />
          </Form.Item>
          <Form.Item name="verifyCode">
            <Row className={styles.row}>
              <Input
              prefix={
                <KeyOutlined className={styles.prefixIcon}
                />
              }
              placeholder="请输入验证码"
              className={styles.verifyCodeInput}
              />
              <Image
              className={styles.verifyCodeImage}
              />
            </Row>
          </Form.Item>
            <Button
            type='primary'
            className={styles.loginBtn}
            onClick={LoginHome}
            >
              登录
            </Button>
        </Form>
      </Card>
      {/* 底部版权 */}
      {/* <Footer /> */}
      </div>
    </div>
  </ConfigProvider>
  )
}

export default LoginPage;
