import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from 'src/tag/tag.entity';
@Entity('question')
export class Question {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;

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

  @ManyToMany(() => Tag, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  tags: Tag[]
}
