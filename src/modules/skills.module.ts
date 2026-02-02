import { Module } from '@nestjs/common';
import { SkillsController } from 'src/controller/skills.controller';
import { SkillsService } from 'src/service/skills.service';

@Module({
  imports: [],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
