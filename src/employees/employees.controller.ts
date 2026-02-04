import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EmployeesService } from 'src/employees/employees.service';
import { Skill } from 'src/skills/schema/skills.schema';
import { AddSkillDto } from './dto/add-skill.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schema/employees.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: ApiResponseDto,
  })
  getEmployees(): Promise<Employee[]> {
    return this.employeesService.getEmployees();
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: ApiResponseDto,
  })
  createEmployee(@Body() req: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.addEmployee(req);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    type: ApiResponseDto,
  })
  updateEmployee(
    @Body() req: UpdateEmployeeDto,
    @Param('id') id: string,
  ): Promise<Employee> {
    return this.employeesService.updateEmployee(req, id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    type: ApiResponseDto,
  })
  deleteEmployee(@Param('id') id: string): Promise<string> {
    return this.employeesService.deleteEmployee(id);
  }

  @Post(':id/skills')
  @ApiResponse({
    status: 201,
    type: ApiResponseDto,
  })
  addSkills(
    @Param('id') id: string,
    @Body() req: AddSkillDto,
  ): Promise<Employee> {
    return this.employeesService.addSkills(req, id);
  }

  @Get('/reports/popular-skills')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    type: ApiResponseDto,
  })
  getSkillsByPopularity(): Promise<Skill[]> {
    return this.employeesService.getPopularSkills();
  }
}
