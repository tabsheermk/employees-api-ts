import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateSkill } from 'src/skills/dto/create-skill.dto';
import { SkillsService } from 'src/skills/skills.service';
import { Skill } from './schema/skills.schema';
import { UpdateSkill } from './dto/update-skill.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

  @Put()
  updateSkill(@Body() req: UpdateSkill): Promise<Skill> {
    return this.skillsService.updateSkill(req);
  }

  @Delete(':skill')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteSkill(@Param('skill') skill: string): Promise<string> {
    return this.skillsService.deleteSkill(skill);
  }
}
