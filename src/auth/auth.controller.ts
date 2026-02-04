import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/swagger/generic-success-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, type: ApiResponseDto })
  login(@Body() req: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(req);
  }
}
