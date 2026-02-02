import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './schema/employees.schema';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getEmployees(): Promise<Employee[]> {
    return this.employeesService.getEmployees();
  }

  @Post()
  createEmployee(@Body() req: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.addEmployee(req);
  }
}
