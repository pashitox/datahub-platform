import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service'; // Ruta correcta para v11
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerData: any) {
    const existingUser = await this.usersService.findByEmail(registerData.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    console.log("Password original:", registerData.password);
    console.log("Password hasheado:", hashedPassword);
    return this.usersService.create({
      ...registerData,
      password: hashedPassword,
    });
  }

  async login(loginData: any) {
    const user = await this.usersService.findByEmail(loginData.email);
    if (!user || !await bcrypt.compare(loginData.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, roles: user.roles };
    
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // 🟢 Nueva lógica: establecer expiración en 7 días
    const refreshTokenExpires = new Date();
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);

    await this.refreshTokenRepository.save({
      user: user,
      token: await bcrypt.hash(refreshToken, 10),
      expiresAt: refreshTokenExpires, // Guardamos fecha de expiración
      isActive: true,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
    };
  }

  async refresh(refreshToken: string) {
    return { accessToken: 'new-token', refreshToken: 'new-refresh-token' };
  }

  async logout(refreshToken: string) {
    return { message: 'Logged out successfully' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
