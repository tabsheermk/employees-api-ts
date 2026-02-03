import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee } from 'src/employees/schema/employees.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async calculateEngagementScore(employeeId: string): Promise<string> {
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

    console.log(engagementScore);

    return engagementScore[0].score + ' is the score';
  }
}
