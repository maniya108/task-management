import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp() as HttpArgumentsHost;
        const request = ctx.getRequest();
        const ctxResponse = ctx.getResponse();

        const excepResponse: any = !!exception && !!exception.getResponse() ? exception.getResponse() : { message: exception.message };
        const excepStatus = exception.getStatus();

        const status = !!excepStatus ? excepStatus : excepResponse?.statusCode;

        const error = !!excepResponse ? excepResponse?.error : exception.name;

        const message = status !== HttpStatus.INTERNAL_SERVER_ERROR ? excepResponse?.message || exception.message : 'Internal Server Error';

        const errorResponse = {
            status,
            timestamp: Date.now(),
            path: request.url,
            method: request.method,
            error,
            messageType: typeof message,
            message
        };

        const logMessage = `${request.method} ${request.url} ${status} ${error}`;

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            Logger.error(logMessage, exception.stack, 'ExceptionFilter', true);
        } else {
            Logger.error(logMessage, JSON.stringify(errorResponse), 'ExceptionFilter', true);
        }

        ctxResponse.status(status).json(errorResponse);

    }
}
