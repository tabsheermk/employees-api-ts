import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSkill } from 'src/skills/dto/create-skill.dto';
import { Skill } from './schema/skills.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async getSkills(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  addSkill(skill: CreateSkill): Promise<Skill> {
    const createdSkill = new this.skillModel(skill);
    return createdSkill.save();
  }
}
