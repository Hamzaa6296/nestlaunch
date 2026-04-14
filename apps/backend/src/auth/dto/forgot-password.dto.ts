import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'hamza@example.com',
    description: 'Email address to send reset link to',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
