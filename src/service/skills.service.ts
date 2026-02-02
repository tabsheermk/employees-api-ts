import { Injectable } from '@nestjs/common';
import { CreateSkill } from 'src/dto/create-skill.dto';

@Injectable()
export class SkillsService {
  getSkills(): string {
    return 'Skills: MERN Stack';
  }

  addSkill(skill: CreateSkill): string {
    return JSON.stringify(skill);
  }
}
