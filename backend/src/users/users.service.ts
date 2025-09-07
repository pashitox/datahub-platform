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
    console.log('🔍 Buscando usuario con ID:', id, 'Tipo:', typeof id);
    
    if (isNaN(id)) {
      console.log('⚠️  ID inválido (NaN), retornando null');
      return null;
    }
    
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    // 🟢 SOLUCIÓN: Validar ID antes de actualizar
    if (isNaN(id)) {
      console.log('❌ No se puede actualizar: ID inválido');
      throw new Error('ID de usuario inválido');
    }
    
    await this.usersRepository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    if (isNaN(id)) {
      console.log('❌ No se puede eliminar: ID inválido');
      return;
    }
    await this.usersRepository.delete(id);
  }
}
