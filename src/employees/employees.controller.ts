import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {
    this.employeesService = employeesService;
  }

  @Get()
  getEmployees(): string {
    return this.employeesService.getEmployees();
  }
}
