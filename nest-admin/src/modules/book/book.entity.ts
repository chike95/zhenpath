import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn() // 主键 自增
  id: number;

  @Column()
  @Unique(['filename'])
  filename: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  bookId: number;

  @Column()
  category: number;

  @Column()
  categoryText: string;

  @Column()
  language: string;

  @Column()
  rootFile: string;

  // 1 - 可用， 0 - 不可用
  @Column({ default: 1 })
  active: number;
}

export default Book;
