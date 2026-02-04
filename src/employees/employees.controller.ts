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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';
import { ErrorResponseDto } from 'src/common/swagger/generic-failure-response';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all employees',
    description: 'Fetch all employees',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  getEmployees(): Promise<Employee[]> {
    return this.employeesService.getEmployees();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get employee by ID',
    description: 'Fetch individual employee details',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  getEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.getEmployeeByID(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create employee',
    description: 'Create a new employee in the system',
  })
  @ApiCreatedResponse({ type: ApiResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  createEmployee(@Body() req: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.addEmployee(req);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update Employee by ID',
    description: 'update individual employee details',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiBearerAuth('jwt')
  updateEmployee(
    @Body() req: UpdateEmployeeDto,
    @Param('id') id: string,
  ): Promise<Employee> {
    return this.employeesService.updateEmployee(req, id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete Employee',
    description: 'delete an employee',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiBearerAuth('jwt')
  deleteEmployee(@Param('id') id: string): Promise<string> {
    return this.employeesService.deleteEmployee(id);
  }

  @Post(':id/skills')
  @ApiOperation({
    summary: 'Add skill to an employee',
    description: "Add new skill  to employee's skills",
  })
  @ApiCreatedResponse({ type: ApiResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  addSkills(
    @Param('id') id: string,
    @Body() req: AddSkillDto,
  ): Promise<Employee> {
    return this.employeesService.addSkills(req, id);
  }

  @Get('/reports/popular-skills')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Get popular skills',
    description:
      'Perform an aggregation and get the most popular skills among the employees',
  })
  @ApiOkResponse({ type: ApiResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiBearerAuth('jwt')
  getSkillsByPopularity(): Promise<Skill[]> {
    return this.employeesService.getPopularSkills();
  }
}
