import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class Admin_AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
    //   request.flash('loginError', 'Please try again!');
      response.redirect('/admin');
    } else {
      response.redirect('/error');
    }
  }
}