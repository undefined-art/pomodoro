import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

import { CoreExceptionsFilter } from './global-filters/core-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response-interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { PrismaClientExceptionFilter } from './global-filters/prisma-client-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalFilters(
    new CoreExceptionsFilter(httpAdapterHost),
    new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter),
  );

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new ResponseInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);
}

bootstrap();
