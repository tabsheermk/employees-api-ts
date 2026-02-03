import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(10, 32)
  @Transform(({ value }) => (value as string).trim())
  email: string;

  @IsString()
  @Length(10, 20)
  password: string;
}
