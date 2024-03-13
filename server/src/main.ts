import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';

import { CoreExceptionsFilter } from './global-filters/core-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response-interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { PrismaClientExceptionFilter } from './global-filters/prisma-client-exception-filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.use(csurf());

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
      secret: configService.get<string>('session.secret'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(configService.get<string>('port'));
}

bootstrap();
