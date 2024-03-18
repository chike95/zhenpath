import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_menu')
export class Menu {
  @PrimaryGeneratedColumn() // 主键 自增
  id: number;
}
