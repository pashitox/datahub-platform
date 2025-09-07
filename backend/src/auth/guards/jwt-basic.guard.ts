import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtBasicGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    console.log('🛡️ JwtBasicGuard ejecutándose...');
    console.log('📨 Authorization header:', request.headers.authorization);
    
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Token no proporcionado o inválido');
      return false;
    }
    
    // Simulación de usuario
    request.user = {
      userId: 6,
      email: 'test2@test.com',  // 🟢 Cambiado a test2@test.com
      roles: ['user'],
    };
    
    console.log('✅ Usuario simulado:', request.user);
    return true;
  }
}
