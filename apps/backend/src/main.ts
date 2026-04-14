import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { existsSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const publicDir = join(__dirname, '..', 'public');
  if (existsSync(publicDir)) {
    app.useStaticAssets(publicDir);

    // SPA fallback: non-API routes serve index.html
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
