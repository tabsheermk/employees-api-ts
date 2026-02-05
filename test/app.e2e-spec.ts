import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('EmployeesController (e2e)', () => {
  let app: INestApplication<App>;
  let employeeId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/employees (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/employees')
      .send({
        employeeName: 'Mk Tabsheer',
        joiningDate: '02-02-2026',
        position: 'Intern',
        email: 'tabhmk2@gmail.com',
      })
      .expect(201);

    employeeId = response.body._id;

    expect(response.body.employeeName).toBe('Mk Tabsheer');
  });

  it('/api/v1/employee/{id} (GET)', () => {
    return request(app.getHttpServer())
      .get('/employees' + employeeId)
      .expect(200)
      .expect((res) => expect(res.body._id).toBe(employeeId));
  });
});
