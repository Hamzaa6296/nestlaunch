import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: false })
  isEmailVerified!: boolean;

  @Prop({ type: String, default: null })
  otp!: string | null;

  @Prop({ type: Date, default: null })
  otpExpiry!: Date | null;

  @Prop({ type: String, default: null })
  resetPasswordToken!: string | null;

  @Prop({ type: Date, default: null })
  resetPasswordExpiry!: Date | null;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
