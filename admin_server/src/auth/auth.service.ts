import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import encry from '../utils/crypto'
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import * as svgCaptcha from 'svg-captcha';
import captcha from 'trek-captcha'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async getCaptcha(req, res, session) {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0oO1ilI',
      noise: 2,
      width: 115,
      height: 36,
      // fontSize: 50,
      color: true,
      background: '#fff',
    });
    // console.log(captcha.text);
    req.session.captchaCode = captcha.text
    res.type('image/svg+xml')
    res.send(captcha)
  }

  // 用户登录
  async login(req, session, loginAuthDto) {
    // console.log('Session at login:', session);
    const { username, password, code } = loginAuthDto
    const user = await this.userService.findByUser(username)
    if(!user){
      return { code: 404, message: '用户不存在'}
    }
    if(user?.password !== encry(password, user.salt)){
      return { code: 401, message: '账号或者密码错误'}
    }
    // if(code?.toUpperCase() !== req.session.captchaCode?.toUpperCase()){
    //   console.log(req.session.captchaCode,code)
    //   return{ code: 401, message: '验证码错误'}
    // }
    try{
      const payload = {
        username: user.username,
        sub: user.id
      }
      const data = await this.jwtService.signAsync(payload)
      return { code: 200, message: '登录成功', data }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
