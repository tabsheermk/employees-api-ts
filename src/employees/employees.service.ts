import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  getEmployees(): string {
    return 'Hello';
  }
}
