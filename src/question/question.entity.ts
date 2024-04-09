import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question')
export class Question {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  question_id: number;

  /**
   * 题目名称
   */
  @Column({
    comment: '题目名称',
  })
  question_name: string;

  /**
   * 题目类型
   * 01-单选 02-多选
   */
  @Column({
    comment: '题目类型',
  })
  question_type: string;
  /**
   * 题目标签
   *
   */
  @Column({
    comment: '题目标签',
  })
  question_tag: number;
  /**
   * 答案选项
   *
   */
  @Column({
    comment: '答案选项',
  })
  answer_options: string;
  /**
   * 正确答案
   *
   */
  @Column({
    comment: '正确答案',
  })
  answer_rights: string;
}
