import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtBasicGuard } from './guards/jwt-basic.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.authService['usersService'].findByVerificationToken(token);
    if (!user) throw new Error('Invalid token');
    await this.authService['usersService'].update(user.id, {
      isEmailVerified: true,
      emailVerificationToken: null,
    });
    return { message: 'Email verified successfully!' };
  }

  @Get('csrf-token')
  @HttpCode(HttpStatus.OK)
  getCsrfToken(@Req() req: any) {
    return { csrfToken: req.csrfToken() };
  }

  @Get('me')
  @UseGuards(JwtBasicGuard)
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtBasicGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    // Limpiar cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }
}