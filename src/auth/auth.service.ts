import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/employees/schema/employees.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(signupDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = signupDto;

    let employee = await this.employeeModel.findOne({ email: email });

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
      const updatedEmployee = await this.employeeModel.findOneAndUpdate(
        { email: email },
        { password: hashedPassword, role: 'admin' },
      );

      employee = updatedEmployee;
    }

    const token = this.jwtService.sign(
      { id: employee?._id, role: employee?.role },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );

    return {
      accessToken: token,
    };
  }
}
