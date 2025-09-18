import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UsersService } from "../users/users.service";

async function verifyEmailDirect() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  
  try {
    const user = await usersService.findByEmail("test@example.com");
    if (user) {
      await usersService.update(user.id, {
        isEmailVerified: true,
        emailVerificationToken: null,
      });
      console.log("✅ Email test@example.com verificado exitosamente");
    } else {
      console.log("❌ Usuario test@example.com no encontrado");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await app.close();
  }
}

verifyEmailDirect();
