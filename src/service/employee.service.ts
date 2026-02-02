import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  getEmployees(): string {
    return 'Hello';
  }
}
