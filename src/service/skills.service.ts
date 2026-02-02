import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  getSkills(): string {
    return 'Skills: MERN Stack';
  }
}
