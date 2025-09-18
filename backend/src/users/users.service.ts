import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    if (isNaN(id)) return null;
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    if (isNaN(id)) throw new Error('ID inválido');
    await this.usersRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    if (!id || isNaN(id)) return;
    await this.usersRepository.delete(id);
  }

  async findByVerificationToken(token: string) {
    return this.usersRepository.findOne({ where: { emailVerificationToken: token } });
  }
}
