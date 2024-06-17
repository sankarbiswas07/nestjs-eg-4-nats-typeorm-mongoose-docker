import { HttpException, HttpStatus } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export function AsyncWrapper(): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        // Ensure that lastValueFrom is only called if result is an Observable
        if (result && typeof result.subscribe === 'function') {
          return await lastValueFrom(result);
        }
        return result;
      } catch (error) {
        console.error('Error in @AsyncWrapper:', error);

        if (error.status === 'error') {
          throw new HttpException(
            {
              status: 'error',
              message: error.message,
              error: error.errors || error.error, // Ensure correct key for additional error details
            },
            HttpStatus.BAD_REQUEST
          );
        }

        // Default to Internal Server Error for unknown errors
        throw new HttpException(
          {
            status: 'error',
            message: 'Internal server error',
            error: error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    };
    return descriptor;
  };
}
