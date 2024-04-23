import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Tag } from 'src/tag/tag.entity'
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questRepo: Repository<Question>,
  ) {}

  /**
   * 查询问题
   *
   */
  async findQuestion(queryData: any): Promise<Question> {
    const info = await this.questRepo.findOne({
      where: queryData,
    });
    return info
  }

  /**
   * 查询所有题目
   *
   */
  async findQuestionAll(queryData: any, take: number, skip: number): Promise<any> {
    const arr = await this.questRepo.findAndCount({
      where: queryData,
      take,
      skip,
      select: {
        id: true,
        question_name: true,
        question_type: true,
        answer_options: true,
        answer_rights: true,
      },
      relations: ['tags']
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
  async addQuestion(name: string, type: string, options: string, rights: string, tags: any): Promise<any> {

    const res = await this.questRepo.save({
      question_name: name,
      question_type: type,
      answer_options: options,
      answer_rights: rights,
      tags,
    });
    return res;
  }

  /**
   * 修改题目
   *
   */
  async updateQuestion(id: number, updateData: any): Promise<any> {
    const res = await this.questRepo.save(
      {
        id,
        ...updateData,
      },
    );
    return res;
  }

  /**
   * 删除题库
   *
   * @param id 题目id
   */
  async deleteQuestion(id: number): Promise<any> {
    const res = await this.questRepo.delete({
      id,
    });
    return res;
  }
}
