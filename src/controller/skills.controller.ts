import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkill } from 'src/dto/create-skill.dto';
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

  @Post()
  addSkill(@Body() req: CreateSkill): string {
    return this.skillsService.addSkill(req);
  }
}
