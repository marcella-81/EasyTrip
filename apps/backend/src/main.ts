import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const publicDir = join(__dirname, '..', 'public');
  if (existsSync(publicDir)) {
    app.useStaticAssets(publicDir);

    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api')) return next();
      const indexPath = join(publicDir, 'index.html');
      if (existsSync(indexPath)) return res.sendFile(indexPath);
      next();
    });
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🌍 Servidor rodando em http://localhost:${port}`);
}
bootstrap();
