import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from 'src/employees/employees.controller';
import { EmployeesService } from 'src/employees/employees.service';
import { Employee, EmployeeSchema } from './schema/employees.schema';
import { SkillsModule } from 'src/skills/skills.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    SkillsModule,
    forwardRef(() => AnalyticsModule),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
