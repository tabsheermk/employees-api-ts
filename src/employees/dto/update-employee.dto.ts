import { Transform } from 'class-transformer';
import { IsString, Length, IsEmail } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @Length(10, 32)
  @Transform(({ value }) => (value as string).trim())
  employeeName: string;

  @IsEmail()
  @Transform(({ value }) => (value as string).trim())
  email: string;

  @IsString()
  @Length(6, 32)
  @Transform(({ value }) => (value as string).trim())
  position: string;
}
