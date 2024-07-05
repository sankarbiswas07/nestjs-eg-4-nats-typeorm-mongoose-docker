import { OrderPaymentStatus, OrderStatus } from 'src/utils/type-helper';

import { IsNotEmpty, IsString, MaxLength, IsNumber, 
  IsInt, IsOptional, IsArray, IsMongoId, 
  IsEnum,
  IsPositive,
  IsBoolean} from 'class-validator';

export class Product {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  product_sku: string;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  _categories?: string[];

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  mrp: number;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  order_qty: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stock_type?: string;

  @IsOptional()
  @IsString()
  image_urls?: string;
}

// Extended DTO User and Shipping Address
export class CreateOrderViaCartDto extends Product {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  user_name: string; // user's or buyer name

  @IsString()
  @IsNotEmpty()
  display_name: string; // user's or buyer display name

  @IsString()
  @IsNotEmpty()
  shipping_id: string // c/o shipping address unique id

  @IsString()
  @IsNotEmpty()
  shipping_name: string; // c/o by - name

  @IsString()
  @IsNotEmpty()
  shipping_phone: string;

  @IsString()
  @IsNotEmpty()
  shipping_line_1: string;

  @IsString()
  @IsOptional()
  shipping_landmark?: string;

  @IsString()
  @IsNotEmpty()
  shipping_state: string;

  @IsString()
  @IsNotEmpty()
  shipping_zip: string;

  @IsBoolean()
  @IsOptional()
  skippedCart?: boolean = false;

  @IsNotEmpty()
  @IsEnum(OrderPaymentStatus) // Validate against OrderPaymentStatus enum
  payment_status: OrderPaymentStatus = OrderPaymentStatus.COD;

  @IsNotEmpty()
  @IsEnum(OrderStatus) // Validate against OrderPaymentStatus enum
  order_status: OrderStatus = OrderStatus.PENDING;
}