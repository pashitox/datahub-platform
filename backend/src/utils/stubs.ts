// Stubs para módulos problemáticos
export class AuthGuard {
  canActivate() { return true; }
}

export class PassportStrategy {
  constructor(strategy: any, options?: any) {}
}

export class PassportModule {
  static register(strategy: any) { return { module: PassportModule }; }
  static forRoot() { return { module: PassportModule }; }
}

export class JwtService {
  sign(payload: any) { return 'stub-token'; }
  verify(token: string) { return {}; }
}

export class JwtModule {
  static register(options: any) { return { module: JwtModule }; }
}

export class ExtractJwt {
  static fromAuthHeaderAsBearerToken() { 
    return (req: any) => req.headers?.authorization?.replace('Bearer ', '') || null;
  }
}

export class Strategy {
  constructor(options: any, verify: any) {}
}

export interface JwtModuleOptions {
  secret?: string;
  signOptions?: any;
}
