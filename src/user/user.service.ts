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
  async findUserById(name: string, pwd: string): Promise<User> {
    const userInfo = await this.userRepo.findOneBy({user_name: name, user_pwd: pwd});
    return userInfo
  }
}
