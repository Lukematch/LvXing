import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import * as session from 'express-session';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter())
  app.use(session({
    secret: "lvxing",
    name: "xl.session",
    rolling: true,
    // resave: false,
    // saveUninitialized: false,
    cookie: { maxAge: null }
  }))

  app.useGlobalInterceptors(new TransformInterceptor())

  app.enableCors({
    origin: [
    'http://127.0.0.1:6400',
    'http://localhost:6400',
  ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // app.use(cors())

  await app.listen(3000);
}
bootstrap();
