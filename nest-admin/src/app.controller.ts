import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/data')
  getData(): string {
    return 'get data';
  }

  @Get('/data/:subid')
  @UseFilters(new HttpExceptionFilter())
  getDataById(@Param() params): string {
    console.log(params);
    return this.appService.getDataS(params);
    // return 'data: ' + params.id + ' and ' + params.subId;
  }

  @Post('/data')
  postData(@Body() body, @Query() query): string {
    console.log(body, query);
    return 'post data: ' + JSON.stringify(body) + ' and id = ' + query.id;
  }

  @Put('/data/')
  putData(@Body() body): string {
    return 'put data: ' + JSON.stringify(body);
  }

  @Put('/data/:id')
  putDataById(): string {
    return 'put data by id: ';
  }

  @Delete('/data/:id')
  deleteData(): string {
    return 'delete data';
  }
}
