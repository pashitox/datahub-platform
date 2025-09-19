import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerData: any) {
    const existingUser = await this.usersService.findByEmail(registerData.email);
    if (existingUser) throw new ConflictException('Email already in use');

    const newUser = await this.usersService.create({
      ...registerData,
      password: registerData.password,
      isEmailVerified: true,
      role: 'user', // todos los registros nuevos son user por defecto
    });

    return { message: 'User created successfully', user: newUser };
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== password) throw new UnauthorizedException('Invalid credentials');

    return { user };
  }
}
