import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Skill } from 'src/skills/schema/skills.schema';
import { AddSkillDto } from './dto/add-skill.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schema/employees.schema';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Skill.name) private skillModel: Model<Skill>,
    @Inject(forwardRef(() => AnalyticsService))
    private readonly analyticsService: AnalyticsService,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async addEmployee(req: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(req);
    createdEmployee.role = 'employee';
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

    let updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $push: { skills: skill } },
    );

    const engageScore = await this.calculateEngagementScore(id);

    updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      { engagementScore: engageScore },
      { new: true },
    );

    if (!updatedEmployee) {
      throw new NotFoundException('Employee not found for the given email');
    }

    return updatedEmployee;
  }

  async getPopularSkills(): Promise<Skill[]> {
    const skills = await this.employeeModel.aggregate([
      { $unwind: '$skills' },
      { $group: { _id: '$skills', count: { $sum: 1 } } },
      { $project: { _id: 0, skill: '$_id', count: 1 } },
      { $sort: { count: -1 } },
    ]);

    return skills;
  }

  async calculateEngagementScore(employeeId: string): Promise<number> {
    const engagementScore = await this.employeeModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(employeeId),
        },
      },
      {
        $project: {
          _id: 1,
          skillsCount: {
            $size: {
              $ifNull: ['$skills', []],
            },
          },
          joiningDate: {
            $toDate: {
              $substr: ['$joiningDate', 0, 24],
            },
          },
        },
      },
      {
        $addFields: {
          yearsSinceHire: {
            $divide: [
              {
                $subtract: [new Date(), '$joiningDate'],
              },
              1000 * 60 * 60 * 24 * 365,
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          score: {
            $round: [
              {
                $add: [
                  { $multiply: ['$skillsCount', 10] },
                  { $multiply: ['$yearsSinceHire', 5] },
                ],
              },
              0,
            ],
          },
        },
      },
    ]);

    return engagementScore[0].score;
  }
}
