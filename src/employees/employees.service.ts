import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './schema/employees.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async addEmployee(req: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(req);
    return createdEmployee.save();
  }

  async updateEmployee(req: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel.findOneAndUpdate(
      { email: req.email },
      { position: req.position },
      { new: true },
    );

    if (!updatedEmployee) {
      throw new NotFoundException('Employee not found for the given email');
    }

    return updatedEmployee;
  }

  async deleteEmployee(email: string): Promise<string> {
    const employee = await this.employeeModel.findOneAndDelete({ email });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return 'Employee Deleted Successfully';
  }
}
