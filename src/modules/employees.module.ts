import { Module } from '@nestjs/common';
import { EmployeesController } from 'src/controller/employees.controller';
import { EmployeesService } from 'src/service/employees.service';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
