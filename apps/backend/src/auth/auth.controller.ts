import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import type { AuthResponse, User as SharedUser } from '@easytrip/shared';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.auth.register(dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.auth.login(dto.email, dto.password);
  }

  @Get('me')
  @Roles()
  me(@CurrentUser() user: AuthUser): Promise<SharedUser> {
    return this.auth.me(user.id);
  }
}
