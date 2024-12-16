import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCommentDto {
  @IsString()
  user_id: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'users';
    required: true;
  };

  @IsString()
  content: string;

  @IsString()
  post_id: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'post';
    required: true;
  };
}
