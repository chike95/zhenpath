import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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

  @Post()
  create(@Body() body) {
    return wrapperResponse(this.menuService.create(body), '创建菜单成功');
  }

  @Put()
  update(@Body() body) {
    return wrapperResponse(this.menuService.update(body), '更新菜单成功');
  }
}
