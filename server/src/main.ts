import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';


import { CoreExceptionsFilter } from './global-filters/core-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response-interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);


  const corsOrigin = configService.get<string | string[]>('cors.origin');
  

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());


  app.useGlobalFilters(
    new CoreExceptionsFilter(httpAdapterHost),
  );

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new ResponseInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(
    session({
      secret: configService.get<string>('session.secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: configService.get<string>('nodeEnv') === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    }),
  );

  const port = configService.get<string>('port');
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📊 Environment: ${configService.get<string>('nodeEnv')}`);
  console.log(`🌐 CORS Origins: ${Array.isArray(corsOrigin) ? corsOrigin.join(', ') : corsOrigin}`);
}

bootstrap();
