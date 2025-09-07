import { ConfigService } from '@nestjs/config';
export interface JwtModuleOptions {}

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN', '15m'),
    issuer: 'datahub-api',
    audience: 'datahub-users',
  },
});
