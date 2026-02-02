import { IsString, Length } from 'class-validator';

export class UpdateSkill {
  @IsString()
  @Length(15, 50)
  description: string;
}
