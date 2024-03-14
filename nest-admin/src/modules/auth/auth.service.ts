import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    const md5Password = md5(password).toUpperCase();
    // console.log(user, md5Password);
    if (user.password !== md5Password) {
      throw new UnauthorizedException('用户名与密码不匹配');
    }

    // 生成 jwt token
    const payload = { username, userid: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
