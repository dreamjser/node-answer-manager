import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question_group')
export class QuestionGroup {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  group_id: number;

  /**
   * 题库名称
   */
  @Column({
    comment: '题库名称',
  })
  group_name: string;

  /**
   * 题库描述
   */
  @Column({
    comment: '题库描述',
  })
  group_desc: string;
  /**
   * 题库类型
   * 01-系统 02-自定义
   */
  @Column({
    comment: '题库类型',
  })
  group_type: string;
}
