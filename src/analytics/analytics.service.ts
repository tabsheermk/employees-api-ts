import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(forwardRef(() => EmployeesService))
    private employeesService: EmployeesService,
  ) {}

  async calculateEngagementScore(id: string): Promise<{ score: number }> {
    const score = await this.employeesService.calculateEngagementScore(id);
    return { score };
  }
}
