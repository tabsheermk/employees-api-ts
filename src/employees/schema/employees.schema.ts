import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Skill } from 'src/skills/schema/skills.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

export type ROLE = 'admin' | 'employee';

@Schema()
export class Employee {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: ROLE;

  @Prop()
  position: string;

  @Prop()
  joiningDate: string;

  @Prop({ required: false })
  skills: Skill[];

  @Prop()
  engagementScore: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
