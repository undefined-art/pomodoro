import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export const errorMappings: Record<
  string,
  { status: number; message: string }
> = {
  P2000: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Input Data is too long',
  },
  P2001: { status: HttpStatus.NO_CONTENT, message: 'Record does not exist' },
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'Reference Data already exists',
  },
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.error(
      `Exception: ${exception.message}, stack: ${exception.stack}`,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorCode = exception.code;
    const errorMapping = errorMappings[errorCode];

    if (errorMapping) {
      const { status, message } = errorMapping;

      response.status(status).json({
        statusCode: status,
        meta: exception.meta,
        message,
      });
    } else {
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      super.catch(exception, host);
    }
  }
}
