import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * 登录
   *
   * @param name
   * @param pwd
   */
  async findUserById(name: string, pwd?: string): Promise<User> {
    const queryData: any = {
      user_name: name
    }
    if(pwd) {
      queryData.user_pwd = pwd
    }
    const userInfo = await this.userRepo.findOne({
      where: queryData,
      select: {
        user_id: true,
        user_name: true,
        user_last_time: true,
      }
    });
    return userInfo
  }

  /**
   * 新增用户
   *
   * @param name
   * @param pwd
   */
  async addUser(name: string, pwd: string): Promise<any> {
    const res = await this.userRepo.insert({
      user_name: name,
      user_pwd: pwd,
    });
    return res
  }
}
