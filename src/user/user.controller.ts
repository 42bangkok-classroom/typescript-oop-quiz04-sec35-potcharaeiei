import { Controller, Get, Param, Query, Body, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users') //P03
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test') //P02
  test(): any[] {
    return this.userService.test();
  }

  @Get() //P03
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string) {
    const fieldArray = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, fieldArray);
  }

  @Post()//P05
  create(@Body(new ValidationPipe()) dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
