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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';
import { ErrorResponseDto } from 'src/common/swagger/generic-failure-response';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOkResponse({ type: ApiResponseDto })
  getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @Post()
  @ApiCreatedResponse({ type: ApiResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  addSkill(@Body() req: CreateSkill): Promise<Skill> {
    return this.skillsService.addSkill(req);
  }

  @Put()
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  updateSkill(@Body() req: UpdateSkill): Promise<Skill> {
    return this.skillsService.updateSkill(req);
  }

  @Delete(':skill')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  deleteSkill(@Param('skill') skill: string): Promise<string> {
    return this.skillsService.deleteSkill(skill);
  }
}
