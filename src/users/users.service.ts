import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UserRepository } from 'src/repositories/user.repositories';

@Injectable()
export class UsersService {
  constructor(@Inject() private readonly userRepo: UserRepository) {}
  registerUserService(createUserDto: CreateUserDto) {
    return this.userRepo.registerUserRepo(createUserDto);
  }

  loginUserService(loginDto: LoginUserDto) {
    return this.userRepo.loginUserRepo(loginDto);
  }
  findOne(id: string) {
    return this.userRepo.findOne(id);
  }
}
