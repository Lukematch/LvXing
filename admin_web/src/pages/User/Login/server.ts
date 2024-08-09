import http from '@/utils/request/http';

export const getCaptcha = () => {
  return http.get({
          url: '/api/auth/captcha',
          // params
        })
}

export const Login= (body: any) => {
  return http.post({
          url: '/api/auth/login',
          data: body
        })
}