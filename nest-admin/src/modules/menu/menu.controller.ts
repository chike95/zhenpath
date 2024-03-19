import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { wrapperResponse } from 'src/utils';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAllMenu() {
    return wrapperResponse(this.menuService.findAll(), '获取菜单成功');
  }

  @Get('active')
  getActiveMenu() {
    return wrapperResponse(this.menuService.findActive(), '获取菜单成功');
  }
}
