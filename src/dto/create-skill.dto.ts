import { IsString, Length } from 'class-validator';

export class CreateSkill {
  @IsString()
  @Length(5, 20)
  name: string;

  @IsString()
  @Length(15, 50)
  description: string;
}
