import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import encry from '../utils/crypto'
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  // 用户登录
  async login(loginAuthDto) {
    const { username, password } = loginAuthDto
    const user = await this.userService.findByUser(username)
    if(user?.password !== encry(password, user.salt)){
     throw new ApiException('账号或者密码错误', ApiErrorCode.STOP)
    }
    try{
      const payload = {
        username: user.username,
        sub: user.id
      }
      return await this.jwtService.signAsync(payload)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
