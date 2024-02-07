import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
