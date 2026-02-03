import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './schema/employees.schema';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  @Put()
  updateEmployee(@Body() req: UpdateEmployeeDto): Promise<Employee> {
    return this.employeesService.updateEmployee(req);
  }

  @Delete(':email')
  deleteEmployee(@Param('email') email: string): Promise<string> {
    return this.employeesService.deleteEmployee(email);
  }
}
