import { RpcException } from '@nestjs/microservices';

export function RpcCatch() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      console.log(`@RpcCatch: user-service : ${propertyKey}`)
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        // Mongoose model level unique constrain check
        if (
          error.message.includes('duplicate key error collection') &&
          [11000].includes(error.code)
        ) {
          const duplicateKey = Object.keys(error.keyPattern).join(', ');
          console.error(`duplicate key error: ${duplicateKey}`)
          throw new RpcException({
            message: `duplicate key error: ${duplicateKey}`,
            propertyKey
          });
        }

        // Other manual trow, probably from service or controller
        throw new RpcException({
          message: error.message || 'unknown error',
          propertyKey
        }); // RpcException type throw required!
      }
    };

    return descriptor;
  };
}
