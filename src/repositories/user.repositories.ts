import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtConstans } from 'src/constans/jwt.constans';
import { NotFoundException } from 'src/exceptions/not_found';
import { checkPassword, generateHash } from 'src/helpers/bcrypt';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export class UserRepository {
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    private readonly jwtservice: JwtService,
  ) {}

  async registerUserRepo(createUserDto: CreateUserDto) {
    try {
      const checkUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      console.log(checkUser);
      const hasPass = await generateHash(createUserDto.password);
      if (!checkUser) {
        const newUser = new this.userModel({
          ...createUserDto,
          password: hasPass,
        });
        await newUser.save();
        return {
          msg: 'Success',
          userId: newUser._id,
        };
      }
      throw new BadRequestException('User Already register');
    } catch (error) {
      return error;
    }
  }
  async loginUserRepo(user: LoginUserDto) {
    try {
      const checkUser = await this.userModel.findOne({ email: user.email });
      if (!checkUser) {
        throw new NotFoundException('User not found');
      }
      const checkPass = await checkPassword(user.password, checkUser.password);
      if (!checkPass) {
        throw new BadRequestException('Your email or password does not match');
      }
      const payload = {
        sub: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
      };
      const accessToken = await this.jwtservice.signAsync(payload, {
        secret: JwtConstans.access.secret,
        expiresIn: JwtConstans.access.exporesTime,
      });
      const refreshToken = await this.jwtservice.signAsync(payload, {
        secret: JwtConstans.refresh.secret,
        expiresIn: JwtConstans.refresh.exporesTime,
      });
      return {
        access: accessToken,
        refresh: refreshToken,
      };
    } catch (error) {
      return error;
    }
  }
  async findOne(id: string) {
    const getById = await this.userModel.findById(id);
    if (!getById) {
      throw new NotFoundException('usere not found');
    }
    const user = getById.toObject();
    delete user.password;
    return user;
  }
}
