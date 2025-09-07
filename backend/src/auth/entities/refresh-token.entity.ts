import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })  // 🟢 Mapear a "user_id" en la DB
  userId: number;

  @ManyToOne(() => User, user => user.refreshTokens)
  @JoinColumn({ name: 'user_id' })  // 🟢 Referenciar la columna correcta
  user: User;

  @Column()
  token: string;

  @Column({ name: 'is_active', default: true })  // 🟢 Mapear a "is_active"
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })  // 🟢 Mapear a "created_at"
  createdAt: Date;

   @Column({ name: 'expires_at', type: 'timestamp', nullable: false }) // 🟢 Campo obligatorio
  expiresAt: Date;
}