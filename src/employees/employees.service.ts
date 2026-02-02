import { Injectable } from '@nestjs/common';
import { Employee } from './schema/employees.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  getEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  addEmployee(req: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(req);
    return createdEmployee.save();
  }
}
