import { Controller, Get } from '@nestjs/common';
import { SkillsService } from 'src/service/skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {
    this.skillsService = skillsService;
  }

  @Get()
  getSkills(): string {
    return this.skillsService.getSkills();
  }
}
