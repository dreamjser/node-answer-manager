import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('m_user')
export class User {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  user_id: number;

  /**
   * 用户名
   */
  @Column({
    comment: '用户名',
  })
  user_name: string;

  /**
   * 密码
   */
  @Column({
    comment: '密码',
  })
  user_pwd: string;
  /**
   * 更新日期
   */
  @Column({
    comment: '更新日期',
  })
  user_last_time: string;
}
