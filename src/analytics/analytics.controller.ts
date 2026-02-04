import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';
import { ErrorResponseDto } from 'src/common/swagger/generic-failure-response';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Get Engagement Score',
    description: 'calcuate engagement score and give to user',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiBearerAuth('jwt')
  getEngagementScore(@Param('id') id: string): Promise<{ score: number }> {
    return this.analyticsService.calculateEngagementScore(id);
  }
}
