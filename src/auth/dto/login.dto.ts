import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(10, 32)
  email: string;

  @IsString()
  @Length(10, 20)
  password: string;
}
