import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  registerUserCon(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUserService(createUserDto);
  }

  @Post('login')
  loginUserCon(@Body() loginDto: LoginUserDto) {
    return this.usersService.loginUserService(loginDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
