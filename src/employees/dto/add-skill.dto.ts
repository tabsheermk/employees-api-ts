import { IsString, Length } from 'class-validator';

export class AddSkillDto {
  @IsString()
  @Length(5, 20)
  name: string;
}
