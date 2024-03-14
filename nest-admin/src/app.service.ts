import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDataS(params): string {
    if (!params.id) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
    return 'getData service';
  }
}
