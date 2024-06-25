import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderPaymentStatus } from 'src/utils/type-helper';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  shipping_id: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsEnum(OrderPaymentStatus) // Validate against OrderPaymentStatus enum
  status: OrderPaymentStatus;
}
