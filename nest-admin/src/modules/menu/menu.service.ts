import { InjectRepository } from '@nestjs/typeorm';
// import { MENU_LIST } from './menu.data';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  findAll() {
    const QUERY_ALL_SQL = 'select * from menu order by id asc ';

    return this.menuRepository.query(QUERY_ALL_SQL);
    // return this.menuRepository.findBy({ active: 1 });
    // return new Promise((resolve) => {
    //   resolve(MENU_LIST);
    // });
  }

  findActive() {
    const sql = 'select * from menu where active = 1 order by id asc ';

    return this.menuRepository.query(sql);
  }

  create(body) {
    console.log(body);
    const data = body.data || body;
    data.redirect = data.redirect || '';
    data.meta = data.meta || '';
    data.pid = data.pid || 0;
    return this.menuRepository.save(data);
  }

  update(body) {
    const id = body?.data?.id || body.id;
    const data = body.data || body;
    return this.menuRepository.update(id, data);
  }
}
