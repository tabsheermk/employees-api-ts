import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class AddSkillDto {
  @IsString()
  @Length(5, 20)
  @Transform(({ value }) => (value as string).trim())
  name: string;
}
