import { Controller, Post, Body } from '@nestjs/common';
import { CreateuserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  createUser(@Body() data: CreateuserDto) {
    return this.userService.createOne(data.name, data.email);
  }
}
