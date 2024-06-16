import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderPaymentStatus } from 'src/utils/type-helper';
// Replace with actual path

export class CreateUserProductOrderPaymentDto {
  @IsNotEmpty()
  @IsString()
  order_id: string; // Use snake_case for DTO properties

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(OrderPaymentStatus) // Validate against OrderPaymentStatus enum
  status: OrderPaymentStatus;
}
