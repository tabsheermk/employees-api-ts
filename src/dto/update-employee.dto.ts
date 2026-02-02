import { IsString, Length, IsEmail } from '@nestjs/class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @Length(10, 32)
  employeeName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 32)
  position: string;
}
