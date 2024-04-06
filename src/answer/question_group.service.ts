import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionGroup } from './question_group.entity';
const dayjs = require('dayjs');
@Injectable()
export class QuestionGroupService {
  constructor(
    @InjectRepository(QuestionGroup)
    private readonly questGroupRepo: Repository<QuestionGroup>,
  ) {}

  /**
   * 查询用户
   *
   * @param name
   * @param pwd
   */
  async findQuestionGroup(queryData: any): Promise<QuestionGroup> {
    const userInfo = await this.questGroupRepo.findOne({
      where: queryData,
    });
    return userInfo
  }

  /**
   * 查询所有题库
   *
   * @param name
   * @param pwd
   */
  async findQuestionGroupAll(queryData: any, take: number, skip: number): Promise<any> {
    const arr = await this.questGroupRepo.findAndCount({
      where: queryData,
      take,
      skip,
      select: {
        group_id: true,
        group_name: true,
        group_desc: true,
        group_type: true,
      },
    });

    return {
      list: arr[0],
      total: arr[1],
    };
  }

  /**
   * 新增题库
   *
   * @param name 题库名称
   * @param desc 题库描述
   */
  async addQuestionGroup(name: string, desc: string): Promise<any> {
    const res = await this.questGroupRepo.insert({
      group_name: name,
      group_desc: desc,
      group_type: '01',
    });
    return res;
  }

  /**
   * 修改题库
   *
   * @param name
   * @param pwd
   */
  async updateQuestionGroup(group_id: number, updateData: any): Promise<any> {
    const res = await this.questGroupRepo.update(
      {
        group_id,
      },
      updateData,
    );
    return res;
  }

  /**
   * 删除题库
   *
   * @param group_id 题库id
   */
  async deleteQuestionGroup(group_id: number): Promise<any> {
    const res = await this.questGroupRepo.delete({
      group_id,
    });
    return res;
  }
}
