import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, LoggerService } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as csurf from "csurf";

// Logger simple en JSON
class JsonLogger implements LoggerService {
  log(message: any, context?: string) {
    console.log(JSON.stringify({ level: "log", message, context, timestamp: new Date().toISOString() }));
  }
  error(message: any, trace?: string, context?: string) {
    console.error(JSON.stringify({ level: "error", message, trace, context, timestamp: new Date().toISOString() }));
  }
  warn(message: any, context?: string) {
    console.warn(JSON.stringify({ level: "warn", message, context, timestamp: new Date().toISOString() }));
  }
  debug(message: any, context?: string) {
    console.debug(JSON.stringify({ level: "debug", message, context, timestamp: new Date().toISOString() }));
  }
  verbose(message: any, context?: string) {
    console.info(JSON.stringify({ level: "verbose", message, context, timestamp: new Date().toISOString() }));
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new JsonLogger(),
  });
  
  // Middleware para cookies
  app.use(cookieParser());
  
  // Configuración CSRF
  app.use(csurf({
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    }
  }));

  // Manejo de errores CSRF
  app.use((err: any, req: any, res: any, next: any) => {
    if (err.code === "EBADCSRFTOKEN") {
      return res.status(403).json({ message: "Invalid CSRF token" });
    }
    next(err);
  });
  
  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Habilitar CORS
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3001, "0.0.0.0");
}
bootstrap();
