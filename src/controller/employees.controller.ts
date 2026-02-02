import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from 'src/service/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  @Get()
  getEmployees(): string {
    return this.employeeService.getEmployees();
  }
}
