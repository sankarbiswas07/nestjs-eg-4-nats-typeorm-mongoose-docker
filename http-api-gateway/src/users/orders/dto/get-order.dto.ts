import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOrderDto {
  @IsNotEmpty()
  @IsUUID('4')
  order_id: string;
}
