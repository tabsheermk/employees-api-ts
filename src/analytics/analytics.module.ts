import { forwardRef, Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [forwardRef(() => EmployeesModule)],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
