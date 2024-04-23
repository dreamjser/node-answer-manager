import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tag')
export class Tag {
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
    comment: 'tag名称',
  })
  tag_name: string;
}
