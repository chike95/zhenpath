import { InjectRepository } from '@nestjs/typeorm';
import Book from './book.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  getBookList(params: any = {}) {
    let page = +params.page || 1;
    let pageSize = +params.pageSize || 20;
    const { title = '', author = '' } = params;

    if (page <= 0) {
      page = 1;
    }

    if (pageSize <= 0 || pageSize > 100) {
      pageSize = 20;
    }

    let where = 'where 1= 1';
    if (title) {
      where += ` And title like '%${title}%'`;
    }
    if (author) {
      where += ` And authot like '%${author}%'`;
    }

    const sql = `select * from book ${where} limit ${pageSize} offset ${(page - 1) * pageSize} `;
    return this.bookRepository.query(sql);
  }
}
