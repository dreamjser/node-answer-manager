import { Controller, Inject, Post, Get, Body, Query } from '@nestjs/common';
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { md5 } from 'js-md5'
import { UserService } from './user.service';
import { Result } from 'src/common/result.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
) { }

  @Post('login')
  async query(@Body() body): Promise<Result> {
    const tokenStr: string = `${body.name}${body.pwd}${+new Date()}`
    const token = md5(tokenStr)
    const str = await this.cacheManager.get(token);
    let data = null

    if(str) {
      data = str
    }else{
      data = await this.userService.findUserById(body.name, body.pwd)
      await this.cacheManager.set(token, data);
    }

    data.token = token

    return {
      errorCode: 0,
      errorMsg: '登录成功',
      data,
    }
  }
  @Get('getUserInfo')
  async queryUserInfo(@Query() query): Promise<Result>{
    const data:any = await this.cacheManager.get(query.token);
    return {
      errorCode: 0,
      errorMsg: '登录成功',
      data,
    }
  }
}
