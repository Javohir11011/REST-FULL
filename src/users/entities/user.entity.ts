import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/enums/user.role';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: [Role.User, Role.Admin, Role.SuperAdmin], default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
