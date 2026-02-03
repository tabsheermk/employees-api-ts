import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class UpdateSkill {
  @IsString()
  @Length(5, 20)
  @Transform(({ value }) => (value as string).trim())
  name: string;

  @IsString()
  @Length(15, 50)
  @Transform(({ value }) => (value as string).trim())
  description: string;
}
