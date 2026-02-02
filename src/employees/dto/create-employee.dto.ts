import { Type } from 'class-transformer';
import { IsString, Length, IsEmail, IsDate } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Length(10, 32)
  employeeName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 32)
  position: string;

  @Type(() => Date)
  @IsDate()
  joiningDate: string;
}
