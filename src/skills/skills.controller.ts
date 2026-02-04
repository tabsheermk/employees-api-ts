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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';
import { ErrorResponseDto } from 'src/common/swagger/generic-failure-response';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all skills',
    description: 'Get all skills',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @Get(':skill')
  @ApiOperation({
    summary: 'Get skill by name',
    description: 'Get individual skill details by name',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  getSkill(@Param('skill') skill: string): Promise<Skill> {
    return this.skillsService.getSkillByName(skill);
  }

  @Post()
  @ApiOperation({
    summary: 'Create Skill',
    description: 'Add new skill to the system',
  })
  @ApiCreatedResponse({ type: ApiResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  addSkill(@Body() req: CreateSkill): Promise<Skill> {
    return this.skillsService.addSkill(req);
  }

  @Put()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update skill',
    description: 'update individual skill details by skill name',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiBearerAuth('jwt')
  updateSkill(@Body() req: UpdateSkill): Promise<Skill> {
    return this.skillsService.updateSkill(req);
  }

  @Delete(':skill')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete skill by skill name',
    description: 'Delete skill by name',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiBearerAuth('jwt')
  deleteSkill(@Param('skill') skill: string): Promise<string> {
    return this.skillsService.deleteSkill(skill);
  }
}
