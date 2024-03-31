import { Controller, Inject, Post, Get, Put, Body, Query } from '@nestjs/common';
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { md5 } from 'js-md5'
import { UserService } from './user.service';
import { Result } from 'src/common/result.interface';
import { responseData } from '../common/utils/response_data'
import { Like } from 'typeorm';
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
      data = await this.userService.findUser({
        user_name: query.name,
        user_pwd: query.pwd
      })
      await this.cacheManager.set(token, data);
    }

    if(!data) {
      return responseData('MT001', '用户名或密码错误')
    }

    data.token = token

    return responseData('0', null, data)
  }

  @Get('getUserList')
  async queryList(@Query() query): Promise<Result> {
    const current = query.current || 1
    const take = query.pageSize || 10
    const skip = (current - 1) * take
    const queryData = query.name? {
      user_name: Like('%' + query.name.trim() + '%')
    }: {}
    const data = await this.userService.findUserAll(queryData, take, skip)

    return responseData('0', null, data)
  }

  @Post('addUser')
  async addUser(@Body() body): Promise<Result>{
    const hasData = await this.userService.findUser({
      user_name: body.name
    })
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

  @Put('updateUser')
  async updateUser(@Body() body): Promise<Result>{
    const hasData = await this.userService.findUser({
      user_id: body.id
    })
    if(hasData) {
      await this.userService.updateUser(body.id, {
        user_name: body.name,
        user_pwd: body.pwd
      })
    }

    return responseData('0')
  }

  @Put('deleteUser')
  async Delete(@Body() body): Promise<Result>{
    const hasData = await this.userService.findUser({
      user_id: body.id
    })

    if(hasData) {
      await this.userService.deleteUser(body.id)
    }

    return responseData('0', '删除成功')
  }
}
