import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Skill } from 'src/skills/schema/skills.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  position: string;

  @Prop()
  joiningDate: string;

  @Prop({ required: false })
  skills: Skill[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
