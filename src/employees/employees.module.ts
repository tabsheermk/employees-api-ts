import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from 'src/employees/employees.controller';
import { EmployeesService } from 'src/employees/employees.service';
import { Employee, EmployeeSchema } from './schema/employees.schema';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    SkillsModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [MongooseModule],
})
export class EmployeesModule {}
