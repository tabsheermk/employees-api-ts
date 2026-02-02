import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkill } from 'src/skills/dto/create-skill.dto';
import { SkillsService } from 'src/skills/skills.service';
import { Skill } from './schema/skills.schema';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @Post()
  addSkill(@Body() req: CreateSkill): Promise<Skill> {
    return this.skillsService.addSkill(req);
  }
}
