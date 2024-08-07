import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuto } from './dto/login-auth.dto'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginAuthDto: LoginAuto) {
    return this.authService.login(loginAuthDto);
  }

}
