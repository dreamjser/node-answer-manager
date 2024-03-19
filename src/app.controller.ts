import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  query(@Query() query): string {
    console.log(query, 'll')
    return this.appService.getHello();
  }
}
