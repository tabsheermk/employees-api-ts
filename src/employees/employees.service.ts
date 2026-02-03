import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './schema/employees.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AddSkillDto } from './dto/add-skill.dto';
import { Skill } from 'src/skills/schema/skills.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Skill.name) private skillModel: Model<Skill>,
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

  async addSkills(req: AddSkillDto, id: string): Promise<Employee> {
    const skill = await this.skillModel.findOne({ name: req.name });

    if (!skill) {
      throw new NotFoundException('Skill Not Found for the given skill name');
    }

    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $push: { skills: skill } },
      { new: true },
    );

    if (!updatedEmployee) {
      throw new NotFoundException('Employee not found for the given email');
    }

    return updatedEmployee;
  }
}
