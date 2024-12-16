import { IsEmail, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePostDto {
  @IsString()
  user_id: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'users';
    required: true;
  };

  @IsString()
  content: string;

  @IsEmail()
  title: string;

  @IsString()
  slug: string;
}
