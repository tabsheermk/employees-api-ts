import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Length, IsEmail, IsDate, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Length(10, 32)
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty()
  employeeName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(6, 32)
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty()
  position: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  joiningDate: string;
}
