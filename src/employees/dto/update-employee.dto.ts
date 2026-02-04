import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto {
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
}
