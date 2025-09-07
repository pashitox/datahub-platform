const { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } = require('typeorm');

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ unique: true })
  email;

  @Column()
  password;

  @Column({ nullable: true })
  firstName;

  @Column({ nullable: true })
  lastName;

  @Column({ default: true })
  isActive;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}

module.exports = User;
