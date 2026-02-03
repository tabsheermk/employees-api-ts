import { Transform, Type } from 'class-transformer';
import { IsString, Length, IsEmail, IsDate } from 'class-validator';

export class CreateEmployeeDto {
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

  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => (value as string).trim())
  joiningDate: string;
}
