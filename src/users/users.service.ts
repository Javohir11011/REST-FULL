import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}