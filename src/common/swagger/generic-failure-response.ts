import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  path: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  message: string;
}
