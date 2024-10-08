import React, { FC, useContext, useEffect, useState } from 'react'

// less样式
import styles from './index.module.less';
import { Button, Card, Form, Image, Input, message, notification, Row, Select } from 'antd';
import { KeyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

import { ConfigProvider } from 'antd';
//@ts-ignore
import { history, useModel } from '@umijs/max';
import { runes } from 'runes2';
import {
  getCaptcha,
  Login
} from './server';
import CustomFooter from '@/components/Footer';
import { Footer } from 'antd/es/layout/layout';
import { getMenuList, getUser } from '@/utils/server';

import { createGradientClass } from 'mini-ground'

interface loginUser {
  username: string,
  password: string,
  code: string,
}

const LoginPage: FC = () => {
  const [form] = Form.useForm();

  const [captcha, setCaptcha] = useState<string>('')
  const { initialState, setInitialState } = useModel('@@initialState');

  // 登录按钮 样式
  const linearGradientButton = createGradientClass('45deg', '#16c8c8', 'orange')
  const loginBtnClassName = `${styles.loginBtn} ${linearGradientButton}`

  const LoginHome = () => {
    // history.push("/home");
    form.validateFields().then((result: loginUser) => {
      // console.log(result);
      if(captcha?.toUpperCase() !== result?.code?.toUpperCase()) {
        message.error('验证码错误')
        getCaptchaData()
        return 0
      }
      Login(result).then( ({data}: any) => {
        // console.log(data);
        if (data.code === 200) {
          localStorage.setItem('token', data.data)
          getUser(result.username).then(async (res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            const {nickName, avatar} = res.data
            // let { data } = await getMenuList(res.data)
            setInitialState({
              user: res.data,
              name: nickName,
              avatar,
              // loading: true,
              // RouteMenu: data
            })
          })
          setTimeout(() => {
            notification.info({
              message: 'token过期',
              description: '请重新登录并验证:-)',
              duration: 0
            })
            localStorage.clear()
            history.push("/user/login");
          }, 1000 * 60 * 60)
          history.push("/instructionPanel/workbench");
          message.success(data.message)
        } else if (data.code === 401 || data.code === 404) {
          if (data.message === "账号或者密码错误") {
            message.error('账号或者密码错误')
            form.resetFields()
            getCaptchaData()
          } else {
            message.error(data.message)
            form.resetFields()
            getCaptchaData()
          }
        }
      })
    })
  }
  const getCaptchaData = async () => {
    let response: any = await getCaptcha()
    let captcha: any = document.getElementById('captcha');
    // const svgText = await response.text();
      // 将SVG文本直接插入到容器中
    captcha.innerHTML = response.data;
    setCaptcha(response.text)
  }
  useEffect(() => {
    getCaptchaData()
  }, [])

  return (
    <ConfigProvider
    // button={{
    //   className: linearGradientButton,
    // }}
    >
    <div>
      <div className={styles.container}>
      <Row>
      <Card
      bordered
      className={styles.loginCard}>
        <h2>Admin-react</h2>
        <Form
        form={form}
        className={styles.loginForm}
        // initialValues={{ remember: false,
        //   username: 'admin',
        //   password: '123456'
        // }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={LoginHome}
        >
          <Form.Item
          name="username"
          rules={[
            { required: true, message: '用户名不为空！' }
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
            { required: true, message: '密码不为空！' }
          ]}>
            <Input.Password
            count={{
              show: true,
              strategy: (txt: any) => runes(txt).length,
            }}
            prefix={
              <LockOutlined className={styles.prefixIcon}/>
            }
            placeholder="请输入密码"
            className={styles.loginInput}
            />
          </Form.Item>
          <Form.Item name="code"
          rules={[
            { required: true, message: '验证码不为空！' }
          ]}>
            <Row className={styles.row}>
              <Input
              prefix={
                <KeyOutlined className={styles.prefixIcon}
                />
              }
              placeholder="请输入验证码"
              className={styles.verifyCodeInput}
              />
              <span
              id="captcha"
              className={styles.verifyCodeImage}
              onClick={getCaptchaData}
              ></span>
            </Row>
          </Form.Item>
          <Button
          type='primary'
          htmlType="submit"
          className={loginBtnClassName}
          // onClick={LoginHome}
          >
            登录
          </Button>
        </Form>
      </Card>
      </Row>
      {/* 底部版权 */}
      <Footer className={styles.footer}>
        <CustomFooter />
      </Footer>
      </div>
    </div>
  </ConfigProvider>
  )
}

export default LoginPage;
