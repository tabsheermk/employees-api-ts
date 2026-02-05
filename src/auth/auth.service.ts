import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(signupDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = signupDto;

    let employee = await this.employeeService.getEmployeeByEmail(email);

    if (!employee) {
      throw new NotFoundException('Employee with email not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (employee.role === 'admin') {
      const isMatch = await bcrypt.compare(password, employee.password);

      if (!isMatch) {
        throw new BadRequestException("Password doesn't match");
      }
    } else {
      const updatedEmployee = await this.employeeService.updateEmployeeByEmail(
        email,
        hashedPassword,
      );

      employee = updatedEmployee;
    }

    const token = this.jwtService.sign(
      { id: (employee as any)?._id.toString(), role: employee?.role },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );

    return {
      accessToken: token,
    };
  }
}
