import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Session, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuto } from './dto/login-auth.dto'



@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('captcha') //当请求该接口时，返回一张随机图片验证码
  getCaptchaData(@Req() req: any, @Res() res: any, @Session() session: any) {
    return this.authService.getCaptcha(req, res, session);
  }

  @Post('login')
  create( @Req() req, @Session() session: Record<string, any>, @Body() loginAuthDto: LoginAuto) {
    return this.authService.login(req, session, loginAuthDto);
  }

}
