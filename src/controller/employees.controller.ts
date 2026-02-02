import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from 'src/service/employees.service';

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
