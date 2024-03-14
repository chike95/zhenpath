import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_user')
export class User {
  @PrimaryGeneratedColumn() // 主键 自增
  id: number;

  @Column() // 关联表名
  @Unique(['username']) // 唯一
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @Column()
  nickname: string;

  @Column()
  active: number;
}
