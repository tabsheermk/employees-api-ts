import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':id')
  getEngagementScore(@Param('id') id: string): Promise<string> {
    return this.analyticsService.calculateEngagementScore(id);
  }
}
