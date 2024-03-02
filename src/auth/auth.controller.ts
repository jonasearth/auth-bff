import { Controller, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto'; // Import the missing LoginDto class
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  async login(@Body() dto: LoginDto) {
    // Rename the parameter to a different name
    return this.authService.login(dto);
  }
}
