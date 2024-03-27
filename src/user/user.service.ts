import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
const dayjs = require('dayjs')
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * 查询用户
   *
   * @param name
   * @param pwd
   */
  async findUser(queryData: any): Promise<User> {
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
   * 查询所有用户
   *
   * @param name
   * @param pwd
   */
  async findUserAll(queryData: any, take: number, skip: number): Promise<any> {
    const arr = await this.userRepo.findAndCount({
      where: queryData,
      take,
      skip,
      select: {
        user_id: true,
        user_name: true,
        user_last_time: true,
      }
    });

    return {
      list: arr[0],
      total: arr[1]
    }
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
      user_last_time: dayjs().format('YYYY-MM-DD HH:MM:ss'),
    });
    return res
  }

  /**
   * 修改用户
   *
   * @param name
   * @param pwd
   */
  async updateUser(user_id: number, updateData: any): Promise<any> {
    console.log(updateData, '99')
    const res = await this.userRepo.update({
      user_id,
    }, updateData);
    console.log(updateData, '99',user_id)
    return res
  }

  /**
   * 删除用户
   *
   * @param name
   * @param pwd
   */
  async deleteUser(user_id: number): Promise<any> {
    const res = await this.userRepo.delete({
      user_id,
    });
    return res
  }
}
