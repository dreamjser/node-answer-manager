import { Controller, Inject, Post, Get, Body, Query } from '@nestjs/common';
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { md5 } from 'js-md5'
import { UserService } from './user.service';
import { Result } from 'src/common/result.interface';
import { responseData } from '../common/utils/response_data'
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
) { }

  @Get('login')
  async query(@Query() query): Promise<Result> {
    const tokenStr: string = `${query.name}${query.pwd}${+new Date()}`
    const token = md5(tokenStr)
    const str = await this.cacheManager.get(token);
    let data = null

    if(str) {
      data = str
    }else{
      data = await this.userService.findUserById(query.name, query.pwd)
      await this.cacheManager.set(token, data);
    }

    if(!data) {
      return responseData('MT001', '用户名或密码错误')
    }

    data.token = token

    return responseData('0', null, data)
  }

  @Post('addUser')
  async addUser(@Body() body): Promise<Result>{
    const hasData = await this.userService.findUserById(body.name)
    if(hasData) {
      return responseData('MT101', '用户已存在')
    }

    const data = await this.userService.addUser(body.name, body.pwd);

    if(data) {
      return responseData('0')
    }else{
      return responseData('MT101', '新增用户失败')
    }
  }
}
