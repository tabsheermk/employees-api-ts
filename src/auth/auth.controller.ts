import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/swagger/generic-failure-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login as Admin',
    description: 'login an employee who is an admin and return access token',
  })
  @ApiCreatedResponse({ type: ApiResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  login(@Body() req: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(req);
  }
}
