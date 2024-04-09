import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
const dayjs = require('dayjs');
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questRepo: Repository<Question>,
  ) {}

  /**
   * 查询用户
   *
   * @param name
   * @param pwd
   */
  async findQuestion(queryData: any): Promise<Question> {
    const userInfo = await this.questRepo.findOne({
      where: queryData,
    });
    return userInfo
  }

  /**
   * 查询所有题目
   *
   * @param name
   * @param pwd
   */
  async findQuestionAll(queryData: any, take: number, skip: number): Promise<any> {
    const arr = await this.questRepo.findAndCount({
      where: queryData,
      take,
      skip,
      select: {
        question_id: true,
        question_name: true,
        question_tag: true,
        question_type: true,
        answer_options: true,
        answer_rights: true,
      },
    });

    return {
      list: arr[0],
      total: arr[1],
    };
  }

  /**
   * 新增题目
   *
   * @param name 题目名称
   * @param type 题目类型
   * @param tag 题目标签
   */
  async addQuestion(name: string, type: string, tag: number, options: string, rights: string): Promise<any> {
    const res = await this.questRepo.insert({
      question_name: name,
      question_tag: tag,
      question_type: type,
      answer_options: options,
      answer_rights: rights,
    });
    return res;
  }

  /**
   * 修改题目
   *
   */
  async updateQuestion(question_id: number, updateData: any): Promise<any> {
    const res = await this.questRepo.update(
      {
        question_id,
      },
      updateData,
    );
    return res;
  }

  /**
   * 删除题库
   *
   * @param question_id 题目id
   */
  async deleteQuestion(question_id: number): Promise<any> {
    const res = await this.questRepo.delete({
      question_id,
    });
    return res;
  }
}
