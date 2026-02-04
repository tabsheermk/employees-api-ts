import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSkill } from 'src/skills/dto/create-skill.dto';
import { Skill } from './schema/skills.schema';
import { Model } from 'mongoose';
import { UpdateSkill } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async getSkills(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async getSkillByName(name: string): Promise<Skill> {
    const skill = await this.skillModel.findOne({
      name,
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return skill;
  }

  async addSkill(skill: CreateSkill): Promise<Skill> {
    const createdSkill = new this.skillModel(skill);
    return createdSkill.save();
  }

  async updateSkill(skill: UpdateSkill): Promise<Skill> {
    const updatedSkill = await this.skillModel.findOneAndUpdate(
      { name: skill.name },
      { description: skill.description },
      { new: true },
    );

    if (!updatedSkill) {
      throw new NotFoundException('Skill not found');
    }

    return updatedSkill;
  }

  async deleteSkill(name: string): Promise<string> {
    const skill = await this.skillModel.findOneAndDelete({
      name: name,
    });

    if (!skill) {
      throw new NotFoundException('SKill not found');
    }

    return 'Skill deleted succcesfully';
  }
}
