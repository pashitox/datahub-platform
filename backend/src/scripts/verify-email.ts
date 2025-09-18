import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function verifyEmail(email: string) {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const user = await usersService.findByEmail(email);
    if (user) {
      await usersService.update(user.id, {
        isEmailVerified: true,
        emailVerificationToken: null,
      });
      console.log(`✅ Email ${email} verificado`);
    } else {
      console.log(`❌ Usuario ${email} no encontrado`);
    }
  } catch (error) {
    console.error('⚠️ Error al verificar el email:', error);
  } finally {
    await app.close();
  }
}

// Verificar el email de prueba desde la línea de comandos
const emailToVerify = process.argv[2] || 'test@example.com';
verifyEmail(emailToVerify).catch(console.error);
