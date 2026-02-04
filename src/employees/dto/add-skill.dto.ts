import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddSkillDto {
  @IsString()
  @Length(5, 20)
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
