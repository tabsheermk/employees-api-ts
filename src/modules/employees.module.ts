import { Module } from '@nestjs/common';
import { EmployeeController } from 'src/controller/employees.controller';
import { EmployeeService } from 'src/service/employee.service';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
