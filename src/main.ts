import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { EmployeeModule } from './modules/employees.module';
import { SkillsModule } from './modules/skills.module';

async function bootstrap() {
  const app = await NestFactory.create(SkillsModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
