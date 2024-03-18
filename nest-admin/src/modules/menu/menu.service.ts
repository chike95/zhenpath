import { MENU_LIST } from './menu.data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  constructor() {}

  findAll() {
    return new Promise((resolve) => {
      resolve(MENU_LIST);
    });
  }
}
