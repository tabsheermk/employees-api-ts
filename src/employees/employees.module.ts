import { Module } from '@nestjs/common';
import { EmployeesController } from 'src/employees/employees.controller';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
