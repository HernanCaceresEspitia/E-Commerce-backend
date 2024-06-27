import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/Logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();
