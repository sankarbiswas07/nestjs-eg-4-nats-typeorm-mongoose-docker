import {
    ArgumentsHost,
    Catch,
    HttpStatus,
    RpcExceptionFilter,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';

import { RpcException } from '@nestjs/microservices';
import { extractRpcError } from './error-utils'

@Catch(RpcException)
export class RpcExceptionGlobalFilter implements RpcExceptionFilter<RpcException> {

    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {

        console.log('RpcExceptionGlobalFilter')
        console.log(exception.stack)

        const ctx = host.switchToRpc();
        const data = ctx.getData();
        const errorDetails = extractRpcError(exception.getError());

        return throwError(() => ({
            status: 'error',
            message: errorDetails.message,
            error: {
                data,
                propertyKey: errorDetails.propertyKey,
                stack: exception?.stack,
            },  // Include the request data if needed for debugging
        }));
    }
}
