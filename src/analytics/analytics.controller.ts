import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
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
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  getEngagementScore(@Param('id') id: string): Promise<{ score: number }> {
    return this.analyticsService.calculateEngagementScore(id);
  }
}
