import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(10, 32)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(10, 20)
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
