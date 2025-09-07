declare module '@nestjs/passport' {
  export * from '@nestjs/passport';
}

declare module '@nestjs/jwt' {
  export * from '@nestjs/jwt';
}

declare module 'passport-jwt' {
  import { Strategy } from 'passport-strategy';
  import { Request } from 'express';
  
  interface StrategyOptions {
    jwtFromRequest: (req: Request) => string | null;
    secretOrKey: string | Buffer;
    issuer?: string;
    audience?: string;
    algorithms?: string[];
    ignoreExpiration?: boolean;
    passReqToCallback?: boolean;
  }

  interface VerifyCallback {
    (payload: any, done: (error: any, user?: any, info?: any) => void): void;
  }

  class Strategy extends Strategy {
    constructor(options: StrategyOptions, verify: VerifyCallback);
  }

  function ExtractJwt(): any;
  
  export { Strategy, ExtractJwt };
}

declare module 'argon2' {
  export function hash(password: string, options?: any): Promise<string>;
  export function verify(hash: string, password: string): Promise<boolean>;
  export default { hash, verify };
}

declare module 'nestjs-pino' {
  export * from 'nestjs-pino';
}

declare namespace Express {
  interface User {
    id: number;
    email: string;
    roles: string[];
  }

  interface Request {
    user?: User;
  }
}
