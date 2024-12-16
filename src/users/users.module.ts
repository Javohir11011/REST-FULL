import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from 'src/repositories/user.repositories';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstans } from 'src/constans/jwt.constans';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: JwtConstans.access.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
})
export class UsersModule {}
